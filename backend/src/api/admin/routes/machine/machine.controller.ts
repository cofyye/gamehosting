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

import { AddMachineDto } from './dtos/add-machine.dto';

import { MachineService } from './machine.service';

@Controller('admin/machine')
@UseGuards(AuthenticatedGuard)
export class MachineController {
  constructor(private readonly _machineService: MachineService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async addMachine(@Body() body: AddMachineDto): Promise<ISendResponse> {
    try {
      await this._machineService.addMachine(body);

      return {
        success: true,
        message: 'You have successfully added the machine.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the machine.',
      );
    }
  }
}
