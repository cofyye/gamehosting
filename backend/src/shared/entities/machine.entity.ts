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

@Entity({
  name: 'machines',
})
export class MachineEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'location_id', nullable: false })
  public locationId: string;

  @Column({ name: 'name', nullable: false, unique: true, length: 40 })
  public name: string;

  @Column({ name: 'ip', nullable: false, unique: true, length: 15 })
  public ip: string;

  @Column({ name: 'username', nullable: false, length: 20 })
  public username: string;

  @Column({ name: 'password', nullable: false, length: 100 })
  public password: string;

  @Column({ name: 'ssh_port', nullable: false, type: 'smallint' })
  public sshPort: number;

  @Column({ name: 'ftp_port', nullable: false, type: 'smallint' })
  public ftpPort: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;

  // Relations

  @ManyToOne(() => LocationEntity, (location) => location.machines, {
    nullable: false,
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'location_id' })
  location?: LocationEntity;

  @OneToMany(() => MachineGamesEntity, (machineGame) => machineGame.machine)
  public machineGames: MachineGamesEntity[];

  @OneToMany(() => ServerEntity, (server) => server.machine)
  servers?: ServerEntity[];
}
