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
  Req,
  UseGuards,
} from '@nestjs/common';
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

      const location: LocationEntity = await this._locationService.addLocation(
        body,
        icon,
      );

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

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public async editLocation(
    @Param() params: UuidDto,
    @Body() body: EditLocationDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      let icon = req.files?.icon;

      await this._locationService.editLocation(params.id, body, icon);

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

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
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
