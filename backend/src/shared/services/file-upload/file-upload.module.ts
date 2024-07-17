import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';

import { FileUploadService } from './file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
