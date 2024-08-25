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
import { MachineEntity } from 'src/shared/entities/machine.entity';

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

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getMachines(): Promise<IDataSendResponse<MachineEntity[]>> {
    try {
      return {
        success: true,
        data: await this._machineService.getMachines(),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all machines.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getMachine(
    @Param() params: UuidDto,
  ): Promise<IDataSendResponse<MachineEntity>> {
    try {
      return {
        success: true,
        data: await this._machineService.getMachine(params.id),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the machine.',
      );
    }
  }

  // @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // public async deleteServer(@Param() params: UuidDto): Promise<ISendResponse> {
  //   try {
  //     await this._machineService.deleteMachine(params.id);

  //     return {
  //       success: true,
  //       message: 'You have successfully deleted the machine.',
  //     };
  //   } catch (err: unknown) {
  //     functions.handleHttpException(
  //       err,
  //       false,
  //       'An error occurred while deleting the machine.',
  //     );
  //   }
  // }
}
