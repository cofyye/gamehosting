import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { LocationEntity } from 'src/shared/entities/location.entity';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import {
  IDataSendResponse,
  ISendResponse,
} from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';
import { UuidDto } from 'src/shared/dtos/uuid.dto';

import { AddLocationDto } from './dtos/add-location.dto';
import { EditLocationDto } from './dtos/edit-location.dto';

import { LocationService } from './location.service';

@Controller('admin/location')
@UseGuards(AuthenticatedGuard)
export class LocationController {
  constructor(private readonly _locationService: LocationService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async addLocation(
    @Body() body: AddLocationDto,
  ): Promise<ISendResponse> {
    try {
      await this._locationService.addLocation(body);

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
      return {
        success: true,
        data: await this._locationService.getLocations(),
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
      return {
        success: true,
        data: await this._locationService.getLocation(params.id),
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

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async editLocation(
    @Param() params: UuidDto,
    @Body() body: EditLocationDto,
  ): Promise<ISendResponse> {
    try {
      await this._locationService.editLocation(params.id, body);

      return {
        success: true,
        message: 'You have successfully updated the location.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while updating the location.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteLocation(
    @Param() params: UuidDto,
  ): Promise<ISendResponse> {
    try {
      await this._locationService.deleteLocation(params.id);

      return {
        success: true,
        message: 'You have successfully deleted the location.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the location.',
      );
    }
  }
}
