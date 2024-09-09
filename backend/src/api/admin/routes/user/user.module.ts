import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { UtilsModule } from 'src/shared/services/utils/utils.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UtilsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
