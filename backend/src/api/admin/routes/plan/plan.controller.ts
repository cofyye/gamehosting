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
import { PlanEntity } from 'src/shared/entities/plan.entity';
import { UserRole } from 'src/shared/enums/role.enum';
import { UuidDto } from 'src/shared/dtos/uuid.dto';

import { AddPlanDto } from './dtos/add-plan.dto';

import { PlanService } from './plan.service';

@Controller('admin/plan')
@UseGuards(AuthenticatedGuard)
export class PlanController {
  constructor(private readonly _planService: PlanService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async addPlan(@Body() body: AddPlanDto): Promise<ISendResponse> {
    try {
      await this._planService.addPlan(body);

      return {
        success: true,
        message: 'You have successfully added the plan.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the plan.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getPlans(): Promise<IDataSendResponse<PlanEntity[]>> {
    try {
      return {
        success: true,
        data: await this._planService.getPlans(),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving all plans.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getPlan(
    @Param() params: UuidDto,
  ): Promise<IDataSendResponse<PlanEntity>> {
    try {
      return {
        success: true,
        data: await this._planService.getPlan(params.id),
        message: 'Success.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while retrieving the plan.',
      );
    }
  }

  @UseGuards(new RoleGuard([UserRole.FOUNDER, UserRole.ADMIN]))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteGame(@Param() params: UuidDto): Promise<ISendResponse> {
    try {
      await this._planService.deletePlan(params.id);

      return {
        success: true,
        message: 'You have successfully deleted the plan.',
      };
    } catch (err: unknown) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while deleting the plan.',
      );
    }
  }
}
