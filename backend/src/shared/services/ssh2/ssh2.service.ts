import { HttpStatus, Injectable } from '@nestjs/common';
import * as Client from 'ssh2-sftp-client';

import { functions } from 'src/shared/utils/functions';

@Injectable()
export class Ssh2Service {
  private readonly client = new Client();

  constructor() {}

  public async checkConnection(config: Client.ConnectOptions): Promise<void> {
    try {
      await this.client.connect(config);
      await this.client.end();
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while connecting to the machine.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
