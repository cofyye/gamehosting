import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { LocationEntity } from 'src/shared/entities/location.entity';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import {
  IDataSendResponse,
  ISendResponse,
} from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';

import { CreateLocationDto } from './dtos/create-location.dto';

import { LocationService } from './location.service';
import { UuidDto } from 'src/shared/dtos/uuid.dto';

@Controller('admin/location')
@UseGuards(AuthenticatedGuard)
export class LocationController {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly _locationRepo: Repository<LocationEntity>,
    private readonly _locationService: LocationService,
  ) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createLocation(
    @Body() body: CreateLocationDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      let icon = req.files?.icon;

      if (!icon) {
        functions.throwHttpException(
          false,
          'The icon field must not be empty.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const location: LocationEntity =
        await this._locationService.createLocation(body, icon);

      if (!location) {
        functions.throwHttpException(
          false,
          'An error occurred while adding the location.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        success: true,
        message: 'You have successfully added the location.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the location.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getLocations(): Promise<IDataSendResponse<LocationEntity[]>> {
    try {
      const locations: LocationEntity[] =
        await this._locationService.getLocations();

      return {
        success: true,
        data: locations,
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all locations.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getLocation(
    @Param() params: UuidDto,
  ): Promise<IDataSendResponse<LocationEntity>> {
    try {
      const location: LocationEntity = await this._locationService.getLocation(
        params.id,
      );

      return {
        success: true,
        data: location,
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the location.',
      );
    }
  }
}
