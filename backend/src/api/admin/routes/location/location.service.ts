import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFile } from 'express-fileupload';

import { LocationEntity } from 'src/shared/entities/location.entity';
import { FileUploadService } from 'src/shared/services/file-upload/file-upload.service';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { functions } from 'src/shared/utils/functions';

import { AddLocationDto } from './dtos/add-location.dto';
import { EditLocationDto } from './dtos/edit-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly _locationRepo: Repository<LocationEntity>,
    private readonly _fileUploadService: FileUploadService,
    private readonly _utilsService: UtilsService,
  ) {}

  public async addLocation(
    body: AddLocationDto,
    icon: UploadedFile | UploadedFile[],
  ): Promise<void> {
    let filename = '';

    try {
      if (!icon) {
        functions.throwHttpException(
          false,
          'The icon field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

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

      await this._locationRepo.save(this._locationRepo.create(location));
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
      const location = await this._utilsService.getLocationById(id);

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
      return await this._utilsService.getLocationById(id);
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
      const location = await this._utilsService.getLocationById(id);

      if (await this._utilsService.locationHasMachines(id)) {
        functions.throwHttpException(
          false,
          'Before deleting the location, you must delete all machines associated with this location.',
          HttpStatus.BAD_REQUEST,
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
