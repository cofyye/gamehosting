import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { MachineEntity } from './machine.entity';
import { ModEntity } from './mod.entity';

import { ServerStatus } from '../enums/server.enum';

@Entity({
  name: 'servers',
})
export class ServerEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'user_id', nullable: false })
  public userId: string;

  @Column({ name: 'machine_id', nullable: false })
  public machineId: string;

  @Column({ name: 'mod_id', nullable: false })
  public modId: string;

  @Column({ name: 'name', nullable: false, length: 40 })
  public name: string;

  @Column({ name: 'slots', nullable: false, length: 5 })
  public slots: string;

  @Column({ name: 'ftp_username', nullable: false, unique: true, length: 21 })
  public ftpUsername: string;

  @Column({ name: 'ftp_password', nullable: false, length: 100 })
  public ftpPassword: string;

  @Column({
    name: 'port',
    nullable: false,
    type: 'smallint',
    unsigned: true,
  })
  public port: number;

  @Column({ name: 'started', nullable: false, default: false })
  public started: boolean;

  @Column({ name: 'status', nullable: false, type: 'enum', enum: ServerStatus })
  public status: ServerStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;

  // Relations

  @ManyToOne(() => UserEntity, (user) => user.servers, {
    nullable: false,
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToOne(() => MachineEntity, (machine) => machine.servers, {
    nullable: false,
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'machine_id' })
  machine?: MachineEntity;

  @ManyToOne(() => ModEntity, (mod) => mod.servers, {
    nullable: false,
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'mod_id' })
  mod?: ModEntity;
}
