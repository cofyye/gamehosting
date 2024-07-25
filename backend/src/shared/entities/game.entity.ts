import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MachineGamesEntity } from './machine-games.entity';
import { ModEntity } from './mod.entity';
import { ServerEntity } from './server.entity';
import { PlanEntity } from './plan.entity';

import { HostBy } from '../enums/game.enum';

@Entity({
  name: 'games',
})
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'name', nullable: false, unique: true, length: 30 })
  public name: string;

  @Column({ name: 'tag', nullable: false, unique: true, length: 20 })
  public tag: string;

  @Column({
    name: 'icon',
    unique: true,
    nullable: false,
    length: 100,
  })
  public icon: string;

  @Column({
    name: 'start_port',
    nullable: false,
    type: 'smallint',
    unsigned: true,
  })
  public startPort: number;

  @Column({
    name: 'end_port',
    nullable: false,
    type: 'smallint',
    unsigned: true,
  })
  public endPort: number;

  @Column({
    name: 'slot_min',
    nullable: false,
    type: 'smallint',
    unsigned: true,
  })
  public slotMin: number;

  @Column({
    name: 'slot_max',
    nullable: false,
    type: 'smallint',
    unsigned: true,
  })
  public slotMax: number;

  @Column({
    name: 'host_by',
    default: HostBy.CUSTOM_RESOURCES,
    nullable: false,
    type: 'enum',
    enum: HostBy,
  })
  public hostBy: HostBy;

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

  @OneToMany(() => MachineGamesEntity, (machineGame) => machineGame.game)
  public machineGames: MachineGamesEntity[];

  @OneToMany(() => ModEntity, (mod) => mod.game)
  mods?: ModEntity[];

  @OneToMany(() => ServerEntity, (server) => server.game)
  servers?: ServerEntity[];

  @OneToMany(() => PlanEntity, (plan) => plan.game)
  plans?: PlanEntity[];
}
