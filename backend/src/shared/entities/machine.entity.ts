import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LocationEntity } from './location.entity';
import { MachineGamesEntity } from './machine-games.entity';
import { ServerEntity } from './server.entity';
import { PlanMachinesEntity } from './plan-machines.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({
  name: 'machines',
})
export class MachineEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Expose()
  @Column({ name: 'location_id', nullable: false })
  public locationId: string;

  @Expose()
  @Column({ name: 'name', nullable: false, unique: true, length: 40 })
  public name: string;

  @Expose()
  @Column({ name: 'ip', nullable: false, unique: true, length: 15 })
  public ip: string;

  @Expose()
  @Column({ name: 'username', nullable: false, length: 20 })
  public username: string;

  @Exclude()
  @Column({ name: 'password', nullable: false, length: 100 })
  public password: string;

  @Expose()
  @Column({ name: 'ssh_port', nullable: false, type: 'smallint' })
  public sshPort: number;

  @Expose()
  @Column({ name: 'ftp_port', nullable: false, type: 'smallint' })
  public ftpPort: number;

  @Expose()
  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;

  // Relations
  @Expose()
  @ManyToOne(() => LocationEntity, (location) => location.machines, {
    nullable: false,
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'location_id' })
  location?: LocationEntity;

  @Expose()
  @OneToMany(() => MachineGamesEntity, (machineGame) => machineGame.machine)
  public machineGames: MachineGamesEntity[];

  @Expose()
  @OneToMany(() => PlanMachinesEntity, (planMachine) => planMachine.machine)
  public planMachines: PlanMachinesEntity[];

  @Expose()
  @OneToMany(() => ServerEntity, (server) => server.machine)
  servers?: ServerEntity[];
}
