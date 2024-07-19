import { Module } from '@nestjs/common';

import { FtpService } from './ftp.service';

@Module({
  imports: [],
  providers: [FtpService],
  exports: [FtpService],
})
export class FtpModule {}
