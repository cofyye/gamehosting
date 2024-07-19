import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { MachineEntity } from 'src/shared/entities/machine.entity';
import { Ssh2Module } from 'src/shared/services/ssh2/ssh2.module';
import { EncryptionModule } from 'src/shared/services/encryption/encryption.module';
import { UtilsModule } from 'src/shared/services/utils/utils.module';

import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MachineEntity]),
    EncryptionModule,
    Ssh2Module,
    UtilsModule,
  ],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
