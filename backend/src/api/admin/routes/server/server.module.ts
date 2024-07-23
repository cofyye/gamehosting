import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { ServerEntity } from 'src/shared/entities/server.entity';
import { Ssh2Module } from 'src/shared/services/ssh2/ssh2.module';
import { EncryptionModule } from 'src/shared/services/encryption/encryption.module';
import { UtilsModule } from 'src/shared/services/utils/utils.module';

import { ServerController } from './server.controller';
import { ServerService } from './server.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ServerEntity]),
    EncryptionModule,
    Ssh2Module,
    UtilsModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
