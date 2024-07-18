import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile } from 'express-fileupload';

import { LocationEntity } from 'src/shared/entities/location.entity';
import { FileUploadService } from 'src/shared/services/file-upload/file-upload.service';
import { functions } from 'src/shared/utils/functions';

import { CreateLocationDto } from './dtos/create-location.dto';
import { EditLocationDto } from './dtos/edit-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly _locationRepo: Repository<LocationEntity>,
    private readonly _fileUploadService: FileUploadService,
  ) {}

  public async createLocation(
    body: CreateLocationDto,
    icon: UploadedFile | UploadedFile[],
  ): Promise<LocationEntity> {
    let filename = '';

    try {
      let location = await this._locationRepo.findOne({
        where: {
          country: body.country,
        },
      });

      if (location) {
        functions.throwHttpException(
          false,
          'This location already exists.',
          HttpStatus.CONFLICT,
        );
      }

      location = new LocationEntity();
      location.country = body.country;
      location.town = body.town;

      filename = await this._fileUploadService.uploadImage('location', icon);

      if (!filename) {
        functions.throwHttpException(
          false,
          'An error occurred while uploading the icon.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      location.icon = filename;

      return await this._locationRepo.save(this._locationRepo.create(location));
    } catch (err) {
      this._fileUploadService.deleteFile(filename);

      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the location.',
      );
    }
  }

  public async editLocation(
    id: string,
    body: EditLocationDto,
    icon: UploadedFile | UploadedFile[],
  ): Promise<void> {
    let filename: string = '';

    try {
      const location = await this._locationRepo.findOne({
        where: {
          id,
        },
      });

      if (!location) {
        functions.throwHttpException(
          false,
          'This location does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      location.country = body.country;
      location.town = body.town;

      if (icon) {
        filename = await this._fileUploadService.uploadImage('location', icon);

        if (!filename) {
          functions.throwHttpException(
            false,
            'An error occurred while uploading the icon.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        this._fileUploadService.deleteFile(location.icon);

        location.icon = filename;
      }

      await this._locationRepo.save(location);
    } catch (err) {
      this._fileUploadService.deleteFile(filename);

      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the location.',
      );
    }
  }

  public async getLocations(): Promise<LocationEntity[]> {
    try {
      return await this._locationRepo.find();
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all locations.',
      );
    }
  }

  public async getLocation(id: string): Promise<LocationEntity> {
    try {
      const location = await this._locationRepo.findOne({
        where: {
          id,
        },
      });

      if (!location) {
        functions.throwHttpException(
          false,
          'This location does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      return location;
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the location.',
      );
    }
  }

  public async deleteLocation(id: string): Promise<void> {
    try {
      const location = await this._locationRepo.findOne({
        where: {
          id,
        },
      });

      if (!location) {
        functions.throwHttpException(
          false,
          'This location does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      if (!(await this._locationRepo.delete({ id })).affected) {
        functions.throwHttpException(
          false,
          'An error occurred while deleting the location.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this._fileUploadService.deleteFile(location.icon);
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the location.',
      );
    }
  }
}
