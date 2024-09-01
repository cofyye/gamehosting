import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  public async addLocation(body: AddLocationDto): Promise<void> {
    try {
      let location = await this._locationRepo.findOne({
        where: {
          country: body.country,
          city: body.city,
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
      location.countryTag = body.countryTag;
      location.city = body.city;

      await this._locationRepo.save(this._locationRepo.create(location));
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the location.',
      );
    }
  }

  public async editLocation(id: string, body: EditLocationDto): Promise<void> {
    try {
      const location = await this._utilsService.getLocationById(id);

      location.country = body.country;
      location.countryTag = body.countryTag;
      location.city = body.city;

      await this._locationRepo.save(location);
    } catch (err) {
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
      if (!(await this._utilsService.locationExists(id))) {
        functions.throwHttpException(
          false,
          'This location does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

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
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the location.',
      );
    }
  }
}
