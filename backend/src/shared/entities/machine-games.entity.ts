import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MachineEntity } from './machine.entity';
import { GameEntity } from './game.entity';

@Entity({
  name: 'machines_games',
})
export class MachineGamesEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'machine_id', nullable: false })
  public machineId: string;

  @Column({ name: 'game_id', nullable: false })
  public gameId: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;

  @ManyToOne(() => MachineEntity, (machine) => machine.machineGames, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'machine_id' })
  public machine: MachineEntity;

  @ManyToOne(() => GameEntity, (game) => game.machineGames, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'game_id' })
  public game: GameEntity;
}
