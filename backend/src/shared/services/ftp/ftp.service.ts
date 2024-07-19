import { HttpStatus, Injectable } from '@nestjs/common';
import { AccessOptions, Client } from 'basic-ftp';

import { functions } from 'src/shared/utils/functions';

@Injectable()
export class FtpService {
  private readonly client = new Client();

  constructor() {}

  public async checkConnection(config: AccessOptions): Promise<void> {
    try {
      await this.client.access(config);
      this.client.close();
    } catch (err: unknown) {
      functions.throwHttpException(
        false,
        `An error occurred while connecting to the FTP server.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
