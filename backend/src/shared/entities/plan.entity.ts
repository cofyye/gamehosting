import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GameEntity } from './game.entity';
import { PlanMachinesEntity } from './plan-machines.entity';
import { ServerEntity } from './server.entity';

@Entity({
  name: 'plans',
})
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'game_id', nullable: false })
  public gameId: string;

  @Column({ name: 'name', nullable: false, length: 40 })
  public name: string;

  @Column({
    name: 'slot',
    nullable: true,
    type: 'smallint',
    unsigned: true,
  })
  public slot: number;

  @Column({ name: 'ram', nullable: true, type: 'bigint' })
  public ram: number;

  @Column({
    name: 'price',
    nullable: true,
    type: 'decimal',
    precision: 8,
    scale: 2,
    unsigned: true,
  })
  public price: number;

  @Column({
    name: 'cpu_count',
    nullable: true,
    type: 'smallint',
    unsigned: true,
  })
  public cpuCount: number;

  @Column({ name: 'description', nullable: true, type: 'text' })
  public description: string;

  @Column({ name: 'active', default: true, nullable: false })
  public active: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;

  // Relations

  @ManyToOne(() => GameEntity, (game) => game.plans, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'game_id' })
  game?: GameEntity;

  @OneToMany(() => ServerEntity, (server) => server.plan)
  servers?: ServerEntity[];

  @OneToMany(() => PlanMachinesEntity, (planMachine) => planMachine.plan)
  public planMachines: PlanMachinesEntity[];
}
