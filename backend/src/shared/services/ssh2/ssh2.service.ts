import { HttpStatus, Injectable } from '@nestjs/common';

import * as Client from 'ssh2-sftp-client';
import { NodeSSH } from 'node-ssh';
import * as path from 'path';

import { functions } from 'src/shared/utils/functions';
import { ISSH2Connect } from 'src/shared/interfaces/ssh.interface';

@Injectable()
export class Ssh2Service {
  private readonly client = new Client();
  private readonly ssh2 = new NodeSSH();

  constructor() {}

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
}
