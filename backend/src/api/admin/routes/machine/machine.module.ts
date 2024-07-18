import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { MachineEntity } from 'src/shared/entities/machine.entity';
import { EncryptionModule } from 'src/shared/services/encryption/encryption.module';

import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MachineEntity]),
    EncryptionModule,
  ],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
