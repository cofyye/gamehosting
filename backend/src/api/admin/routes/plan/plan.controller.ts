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

import { AddPlanDto } from './dtos/add-plan.dto';

import { PlanService } from './plan.service';

@Controller('admin/plan')
@UseGuards(AuthenticatedGuard)
export class PlanController {
  constructor(private readonly _planService: PlanService) {}

  @UseGuards(new RoleGuard([UserRole.FOUNDER]))
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async addLocation(@Body() body: AddPlanDto): Promise<ISendResponse> {
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
}
