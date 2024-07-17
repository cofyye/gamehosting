import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { EmailModule } from 'src/shared/services/email/email.module';
import { FileUploadModule } from 'src/shared/services/file-upload/file-upload.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    EmailModule,
    FileUploadModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
