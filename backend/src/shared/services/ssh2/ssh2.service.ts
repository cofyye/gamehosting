import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
import { GameEntity } from 'src/shared/entities/game.entity';
import { PlanEntity } from 'src/shared/entities/plan.entity';
import { HostBy } from 'src/shared/enums/game.enum';

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
      await this.checkConnection(config);

      await this.client.connect(config);

      if (!(await this.client.exists('/root/falconx'))) {
        await this.client.mkdir('/root/falconx');
      }

      if (!(await this.client.exists('/root/falconx/add_vsftpd_user.sh'))) {
        await this.client.fastPut(
          path.join(__dirname, '..', '..', '..', 'bash', 'add_vsftpd_user.sh'),
          '/root/falconx/add_vsftpd_user.sh',
        );
      }

      if (!(await this.client.exists('/root/falconx/delete_vsftpd_user.sh'))) {
        await this.client.fastPut(
          path.join(
            __dirname,
            '..',
            '..',
            '..',
            'bash',
            'delete_vsftpd_user.sh',
          ),
          '/root/falconx/delete_vsftpd_user.sh',
        );
      }

      if (
        !(await this.client.exists('/root/falconx/install_vsftpd_server.sh'))
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
          '/root/falconx/install_vsftpd_server.sh',
        );
      }

      if (!(await this.client.exists('/root/falconx/required_packages.sh'))) {
        await this.client.fastPut(
          path.join(
            __dirname,
            '..',
            '..',
            '..',
            'bash',
            'required_packages.sh',
          ),
          '/root/falconx/required_packages.sh',
        );
      }

      await this.client.chmod('/root/falconx/add_vsftpd_user.sh', '755');
      await this.client.chmod('/root/falconx/delete_vsftpd_user.sh', '755');
      await this.client.chmod('/root/falconx/required_packages.sh', '755');
      await this.client.chmod('/root/falconx/install_vsftpd_server.sh', '755');

      await this.ssh2.connect(config);

      const installRequiredPackagesResult = await this.ssh2.execCommand(
        'cd /root/falconx && sudo ./required_packages.sh',
      );

      if (installRequiredPackagesResult.code !== 0) {
        functions.throwHttpException(
          false,
          `An error occurred while installing the necessary files on the machine.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const installVsftpdResult = await this.ssh2.execCommand(
        'cd /root/falconx && sudo ./install_vsftpd_server.sh',
      );

      if (installVsftpdResult.code !== 0) {
        functions.throwHttpException(
          false,
          `An error occurred while installing the vsftpd server on the machine.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while installing the necessary files on the machine.`,
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
        const config: ISSH2Connect = {
          host: machine.ip,
          username: machine.username,
          password: this._encryptionService.decrypt(machine.password),
          port: machine.sshPort,
          readyTimeout: 3000,
        };

        await this.checkConnection(config);

        await this.client.connect(config);

        if (!(await this.client.exists('/opt/falconx'))) {
          await this.client.mkdir('/opt/falconx');
        }

        if (!(await this.client.exists(`/opt/falconx/${dockerImage}`))) {
          await this.client.mkdir(`/opt/falconx/${dockerImage}`);
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
          `/opt/falconx/${dockerImage}/Dockerfile.zip`,
        );

        await this.ssh2.connect(config);

        const unzipResult = await this.ssh2.execCommand(
          `cd /opt/falconx/${dockerImage} && unzip Dockerfile.zip && rm -rf Dockerfile.zip`,
        );

        if (unzipResult.code !== 0) {
          functions.throwHttpException(
            false,
            `An error occurred while uploading Dockerfile.`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        const buildResult = await this.ssh2.execCommand(
          `cd /opt/falconx/${dockerImage} && sudo docker build -t ${dockerImage} .`,
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

        await this.client.rmdir(`/opt/falconx/${dockerFolder}`, true);

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
    game: GameEntity,
    plan: PlanEntity,
  ): Promise<void> {
    try {
      const config: ISSH2Connect = {
        host: machine.ip,
        username: machine.username,
        password: this._encryptionService.decrypt(machine.password),
        port: machine.sshPort,
        readyTimeout: 3000,
      };

      const variables: IRequiredStartupVariable = {
        IP: machine.ip,
        PORT: server.port.toString(),
        SLOT: null,
        RAM: null,
        FTP_USER: server.ftpUsername,
        CPU_COUNT: null,
      };

      functions.checkRequiredStartupCommandParameters(
        game.hostBy,
        mod.startupCommand,
      );

      if (game.hostBy === HostBy.SLOT) {
        variables.SLOT = plan.slot.toString();
      } else {
        variables.CPU_COUNT = plan.cpuCount.toString();
        variables.RAM = plan.ram.toString();
      }

      functions.checkParametersForGameHostType(
        game.hostBy,
        variables.RAM,
        variables.CPU_COUNT,
        variables.SLOT,
      );

      if (!variables.RAM && !variables.SLOT) {
        functions.throwHttpException(
          false,
          `Both ram and slot cannot be empty.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.checkConnection(config);

      await this.ssh2.connect(config);

      const addFtpUserResult = await this.ssh2.execCommand(
        `/root/falconx/add_vsftpd_user.sh ${server.ftpUsername} ${this._encryptionService.decrypt(server.ftpPassword)}`,
      );

      if (addFtpUserResult.code !== 0) {
        await this._utilsService.deleteServerById(server.id);

        functions.throwHttpException(
          false,
          `An error occurred while creating FTP user.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

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
      if (err instanceof HttpException) {
        if (
          err.getStatus() === HttpStatus.BAD_REQUEST ||
          err.getStatus() === HttpStatus.CONFLICT
        ) {
          await this._utilsService.deleteServerById(server.id);
        }
      }

      console.log(err);

      functions.handleHttpException(
        err,
        false,
        `An error occurred while installing a server.`,
      );
    } finally {
      this.ssh2.dispose();
    }
  }

  // Delete game server
  public async deleteGameServer(
    server: ServerEntity,
    machine: MachineEntity,
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

      const deleteFtpUserResult = await this.ssh2.execCommand(
        `/root/falconx/delete_vsftpd_user.sh ${server.ftpUsername}`,
      );

      if (deleteFtpUserResult.code !== 0) {
        functions.throwHttpException(
          false,
          `An error occurred while deleting FTP user.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.ssh2.execCommand(`docker stop ${server.ftpUsername}`);

      const deleteServerDockerResult = await this.ssh2.execCommand(
        `docker rm ${server.ftpUsername}`,
      );

      if (deleteServerDockerResult.code !== 0) {
        functions.throwHttpException(
          false,
          `The FTP account and server files were deleted, but an error occurred while deleting the server container, so the server was not removed from the database.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        `An error occurred while deleting a server.`,
      );
    } finally {
      this.ssh2.dispose();
    }
  }
}
