import { HttpStatus, Injectable } from '@nestjs/common';

import * as Client from 'ssh2-sftp-client';
import { NodeSSH } from 'node-ssh';
import * as path from 'path';

import { functions } from 'src/shared/utils/functions';
import { ISSH2Connect } from 'src/shared/interfaces/ssh.interface';
import { UtilsService } from '../utils/utils.service';
import { ServerEntity } from 'src/shared/entities/server.entity';
import { MachineEntity } from 'src/shared/entities/machine.entity';
import { ModEntity } from 'src/shared/entities/mod.entity';
import { IRequiredStartupVariable } from 'src/shared/interfaces/startup.interface';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class Ssh2Service {
  private readonly client = new Client();
  private readonly ssh2 = new NodeSSH();

  constructor(
    private readonly _utilsService: UtilsService,
    private readonly _encryptionService: EncryptionService,
  ) {}

  public async checkConnection(config: ISSH2Connect): Promise<void> {
    try {
      await this.client.connect(config);
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while connecting to the machine.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await this.client.end();
    }
  }

  // Auto installing needed packages like vsftpd and etc while machine added
  public async autoInstallationWizard(config: ISSH2Connect): Promise<void> {
    try {
      await this.client.connect(config);

      if (!(await this.client.exists('/root/gamehosting'))) {
        await this.client.mkdir('/root/gamehosting');
      }

      if (!(await this.client.exists('/root/gamehosting/add_vsftpd_user.sh'))) {
        await this.client.fastPut(
          path.join(__dirname, '..', '..', '..', 'bash', 'add_vsftpd_user.sh'),
          '/root/gamehosting/add_vsftpd_user.sh',
        );
      }

      if (
        !(await this.client.exists('/root/gamehosting/delete_vsftpd_user.sh'))
      ) {
        await this.client.fastPut(
          path.join(
            __dirname,
            '..',
            '..',
            '..',
            'bash',
            'delete_vsftpd_user.sh',
          ),
          '/root/gamehosting/delete_vsftpd_user.sh',
        );
      }

      if (
        !(await this.client.exists(
          '/root/gamehosting/install_vsftpd_server.sh',
        ))
      ) {
        await this.client.fastPut(
          path.join(
            __dirname,
            '..',
            '..',
            '..',
            'bash',
            'install_vsftpd_server.sh',
          ),
          '/root/gamehosting/install_vsftpd_server.sh',
        );
      }

      await this.client.chmod('/root/gamehosting/add_vsftpd_user.sh', '755');
      await this.client.chmod('/root/gamehosting/delete_vsftpd_user.sh', '755');
      await this.client.chmod(
        '/root/gamehosting/install_vsftpd_server.sh',
        '755',
      );

      await this.ssh2.connect(config);

      const result = await this.ssh2.execCommand(
        'cd /root/gamehosting && sudo ./install_vsftpd_server.sh',
      );

      if (result.code === 254) {
        throw new Error(
          'An error occurred while installing the necessary files on the machine.',
        );
      }
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while installing the necessary files on the machine.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await this.client.end();
      this.ssh2.dispose();
    }
  }

  // Upload and build docker on all VPS/Dedicated where defined for game id
  public async uploadAndBuildDocker(
    gameId: string,
    dockerImage: string,
  ): Promise<void> {
    try {
      const machines =
        await this._utilsService.getAllMachinesFromGameId(gameId);

      for (const machine of machines) {
        await this.client.connect({
          host: machine.ip,
          username: machine.username,
          password: this._encryptionService.decrypt(machine.password),
          port: machine.sshPort,
          readyTimeout: 3000,
        });

        if (!(await this.client.exists('/opt/gamehosting'))) {
          await this.client.mkdir('/opt/gamehosting');
        }

        if (!(await this.client.exists(`/opt/gamehosting/${dockerImage}`))) {
          await this.client.mkdir(`/opt/gamehosting/${dockerImage}`);
        }

        await this.client.fastPut(
          path.join(
            __dirname,
            '..',
            '..',
            '..',
            'dockers-custom',
            `${dockerImage}`,
            'Dockerfile.zip',
          ),
          `/opt/gamehosting/${dockerImage}/Dockerfile.zip`,
        );

        await this.ssh2.connect({
          host: machine.ip,
          username: machine.username,
          password: this._encryptionService.decrypt(machine.password),
          port: machine.sshPort,
          readyTimeout: 3000,
        });

        const unzipResult = await this.ssh2.execCommand(
          `cd /opt/gamehosting/${dockerImage} && unzip Dockerfile.zip && rm -rf Dockerfile.zip`,
        );

        if (unzipResult.code !== 0) {
          functions.throwHttpException(
            false,
            `An error occurred while uploading Dockerfile.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        const buildResult = await this.ssh2.execCommand(
          `cd /opt/gamehosting/${dockerImage} && sudo docker build -t ${dockerImage} .`,
        );

        if (buildResult.code !== 0) {
          functions.throwHttpException(
            false,
            `An error occurred while building Dockerfile.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while uploading and building Dockerfile.`,
      );
    } finally {
      await this.client.end();
      this.ssh2.dispose();
    }
  }

  // Remove if upload and build docker failed
  public async removeIfuploadAndBuildDockerFailed(
    gameId: string,
    dockerFolder: string,
  ): Promise<void> {
    try {
      const machines =
        await this._utilsService.getAllMachinesFromGameId(gameId);

      for (const machine of machines) {
        await this.client.connect({
          host: machine.ip,
          username: machine.username,
          password: this._encryptionService.decrypt(machine.password),
          port: machine.sshPort,
          readyTimeout: 3000,
        });

        await this.client.rmdir(`/opt/gamehosting/${dockerFolder}`, true);

        await this.ssh2.connect({
          host: machine.ip,
          username: machine.username,
          password: this._encryptionService.decrypt(machine.password),
          port: machine.sshPort,
          readyTimeout: 3000,
        });

        await this.ssh2.execCommand(`sudo docker rmi ${dockerFolder}`);
      }
    } catch (err: unknown) {
    } finally {
      await this.client.end();
      this.ssh2.dispose();
    }
  }

  // Create and install game server
  public async createGameServer(
    server: ServerEntity,
    machine: MachineEntity,
    mod: ModEntity,
  ): Promise<void> {
    try {
      const config: ISSH2Connect = {
        host: machine.ip,
        username: machine.username,
        password: this._encryptionService.decrypt(machine.password),
        port: machine.sshPort,
        readyTimeout: 3000,
      };

      await this.checkConnection(config);

      await this.ssh2.connect(config);

      const addFtpUserResult = await this.ssh2.execCommand(
        `/root/gamehosting/add_vsftpd_user.sh ${server.ftpUsername} ${this._encryptionService.decrypt(server.ftpPassword)}`,
      );

      if (addFtpUserResult.code !== 0) {
        functions.throwHttpException(
          false,
          `An error occurred while creating FTP user.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Kada se dodaju planovi, ovo se menja
      // Ovo su obavezni parametri
      const variables: IRequiredStartupVariable = {
        IP: machine.ip,
        PORT: server.port.toString(),
        SLOT: server.slot.toString(),
        RAM: '',
        FTP_USER: server.ftpUsername,
      };

      const dockerCommand = functions.getCompleteReplacedDockerCommand(
        mod.startupCommand,
        variables,
        server.startupVariables,
      );

      const dockerCommandResult = await this.ssh2.execCommand(
        `${dockerCommand}`,
      );

      if (dockerCommandResult.code !== 0) {
        functions.throwHttpException(
          false,
          `An error occurred while running a server.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while installing a server.`,
      );
    } finally {
      await this.client.end();
      this.ssh2.dispose();
    }
  }
}
