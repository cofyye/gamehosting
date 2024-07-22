import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { ISendResponse } from 'src/shared/interfaces/response.interface';
import { functions } from 'src/shared/utils/functions';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UserRole } from 'src/shared/enums/role.enum';

import { AddModDto } from './dtos/add-mod.dto';

import { ModService } from './mod.service';

@Controller('admin/mod')
@UseGuards(AuthenticatedGuard)
export class ModController {
  constructor(private readonly _modService: ModService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
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
}
