import { Module } from '@nestjs/common';

import { Ssh2Service } from './ssh2.service';

@Module({
  imports: [],
  providers: [Ssh2Service],
  exports: [Ssh2Service],
})
export class Ssh2Module {}
