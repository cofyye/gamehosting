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
import { ServerEntity } from './server.entity';

@Entity({
  name: 'mods',
})
export class ModEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'game_id', nullable: false })
  public gameId: string;

  @Column({ name: 'mod_name', nullable: false, unique: true, length: 40 })
  public modName: string;

  @Column({ name: 'docker_name', nullable: false, unique: true, length: 40 })
  public dockerName: string;

  @Column({ name: 'startup_variables', nullable: false, type: 'text' })
  public startupVariables: string;

  @Column({ name: 'startup_command', nullable: false, type: 'text' })
  public startupCommand: string;

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

  @ManyToOne(() => GameEntity, (game) => game.mods, {
    nullable: false,
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'game_id' })
  game?: GameEntity;

  @OneToMany(() => ServerEntity, (server) => server.mod)
  servers?: ServerEntity[];
}
