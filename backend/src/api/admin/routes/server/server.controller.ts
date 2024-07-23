import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { ISendResponse } from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';

import { AddServerDto } from './dtos/add-server.dto';

import { ServerService } from './server.service';

@Controller('admin/server')
@UseGuards(AuthenticatedGuard)
export class ServerController {
  constructor(private readonly _serverService: ServerService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
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
}
