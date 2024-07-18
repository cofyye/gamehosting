import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';

import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationEntity } from 'src/shared/entities/location.entity';
import { FileUploadModule } from 'src/shared/services/file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, LocationEntity]),
    FileUploadModule,
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
