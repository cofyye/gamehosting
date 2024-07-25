import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlanEntity } from 'src/shared/entities/plan.entity';
import { functions } from 'src/shared/utils/functions';
import { UtilsService } from 'src/shared/services/utils/utils.service';

import { AddPlanDto } from './dtos/add-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly _planRepo: Repository<PlanEntity>,
    private readonly _utilsService: UtilsService,
  ) {}

  public async addPlan(body: AddPlanDto): Promise<void> {
    try {
      const providedMachinesForPlan = functions.validateProvidedMachinesForPlan(
        body.machines,
      );

      if (!(await this._utilsService.gameExists(body.gameId))) {
        functions.throwHttpException(
          false,
          'This game does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }

      let plan = new PlanEntity();
      plan.name = body.name;
      plan.slotRamQuantity = body.slotRamQuantity;
      plan.cpuCount = body.cpuCount;
      plan.description = body.description;
      plan.price = body.price;
      plan.gameId = body.gameId;

      plan = await this._planRepo.save(this._planRepo.create(plan));

      await this._utilsService.addMachinesForPlan(
        plan,
        providedMachinesForPlan,
      );
    } catch (err) {
      functions.handleHttpException(
        err,
        false,
        'An error occurred while adding the plan.',
      );
    }
  }
}
