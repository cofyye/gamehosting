import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from 'src/shared/entities/user.entity';
import { PlanEntity } from 'src/shared/entities/plan.entity';
import { UtilsModule } from 'src/shared/services/utils/utils.module';

import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PlanEntity]), UtilsModule],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
