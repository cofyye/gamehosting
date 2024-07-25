import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GameEntity } from './game.entity';

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

  @Column({ name: 'slot_ram_quantity', nullable: false, type: 'bigint' })
  public slotRamQuantity: number;

  @Column({
    name: 'price',
    nullable: true,
    type: 'decimal',
    precision: 5,
    scale: 2,
    unsigned: true,
  })
  public price: number;

  @Column({
    name: 'cpu_count',
    nullable: false,
    type: 'smallint',
    unsigned: true,
  })
  public cpuCount: number;

  @Column({ name: 'description', nullable: false, type: 'text' })
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
}
