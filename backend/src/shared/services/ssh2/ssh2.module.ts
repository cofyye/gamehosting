import { Module } from '@nestjs/common';

import { Ssh2Service } from './ssh2.service';
import { UtilsModule } from '../utils/utils.module';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [UtilsModule, EncryptionModule],
  providers: [Ssh2Service],
  exports: [Ssh2Service],
})
export class Ssh2Module {}
