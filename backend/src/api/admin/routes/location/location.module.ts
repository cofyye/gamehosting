import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { LocationEntity } from 'src/shared/entities/location.entity';
import { FileUploadModule } from 'src/shared/services/file-upload/file-upload.module';
import { UtilsModule } from 'src/shared/services/utils/utils.module';

import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, LocationEntity]),
    FileUploadModule,
    UtilsModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
