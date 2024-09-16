import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import {
  IDataSendResponse,
  ISendResponse,
} from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';
import { UuidDto } from 'src/shared/dtos/uuid.dto';
import { ServerEntity } from 'src/shared/entities/server.entity';

import { AddServerDto } from './dtos/add-server.dto';

import { ServerService } from './server.service';

@Controller('admin/server')
@UseGuards(AuthenticatedGuard)
export class ServerController {
  constructor(private readonly _serverService: ServerService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async addServer(@Body() body: AddServerDto): Promise<ISendResponse> {
    try {
      await this._serverService.addServer(body);

      return {
        success: true,
        message: 'You have successfully added the server.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the server.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getServers(): Promise<IDataSendResponse<ServerEntity[]>> {
    try {
      return {
        success: true,
        data: await this._serverService.getServers(),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all servers.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getServer(
    @Param() params: UuidDto,
  ): Promise<IDataSendResponse<ServerEntity>> {
    try {
      return {
        success: true,
        data: await this._serverService.getServer(params.id),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the server.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteServer(@Param() params: UuidDto): Promise<ISendResponse> {
    try {
      await this._serverService.deleteServer(params.id);

      return {
        success: true,
        message: 'You have successfully deleted the server.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the server.',
      );
    }
  }
}
