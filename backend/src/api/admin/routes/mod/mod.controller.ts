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
import { Request } from 'express';

import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import {
  IDataSendResponse,
  ISendResponse,
} from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';
import { ModEntity } from 'src/shared/entities/mod.entity';
import { UuidDto } from 'src/shared/dtos/uuid.dto';

import { AddModDto } from './dtos/add-mod.dto';

import { ModService } from './mod.service';

@Controller('admin/mod')
@UseGuards(AuthenticatedGuard)
export class ModController {
  constructor(private readonly _modService: ModService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async addMod(
    @Body() body: AddModDto,
    @Req() req: Request,
  ): Promise<ISendResponse> {
    try {
      await this._modService.addMod(body, req.files?.dockerFile);

      return {
        success: true,
        message: 'You have successfully added the mod.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the mod.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getMods(): Promise<IDataSendResponse<ModEntity[]>> {
    try {
      return {
        success: true,
        data: await this._modService.getMods(),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all mods.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getMod(
    @Param() params: UuidDto,
  ): Promise<IDataSendResponse<ModEntity>> {
    try {
      return {
        success: true,
        data: await this._modService.getMod(params.id),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the mod.',
      );
    }
  }
}
