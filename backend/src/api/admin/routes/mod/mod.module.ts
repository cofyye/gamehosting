import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { ModEntity } from 'src/shared/entities/mod.entity';
import { FileUploadModule } from 'src/shared/services/file-upload/file-upload.module';
import { UtilsModule } from 'src/shared/services/utils/utils.module';
import { Ssh2Module } from 'src/shared/services/ssh2/ssh2.module';

import { ModController } from './mod.controller';
import { ModService } from './mod.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ModEntity]),
    FileUploadModule,
    UtilsModule,
    Ssh2Module,
  ],
  controllers: [ModController],
  providers: [ModService],
})
export class ModModule {}
