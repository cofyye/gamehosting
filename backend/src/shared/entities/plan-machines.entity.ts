import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MachineEntity } from './machine.entity';
import { PlanEntity } from './plan.entity';

@Entity({
  name: 'plans_machines',
})
export class PlanMachinesEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'plan_id', nullable: false })
  public planId: string;

  @Column({ name: 'machine_id', nullable: false })
  public machineId: string;

  @Column({
    name: 'server_count',
    nullable: false,
    type: 'smallint',
    unsigned: true,
  })
  public serverCount: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;

  // Relations

  @ManyToOne(() => PlanEntity, (plan) => plan.planMachines, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_id' })
  public plan: PlanEntity;

  @ManyToOne(() => MachineEntity, (machine) => machine.planMachines, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'machine_id' })
  public machine: MachineEntity;
}
