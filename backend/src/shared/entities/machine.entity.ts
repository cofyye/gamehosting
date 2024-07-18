import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'machines',
})
export class MachineEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

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

  @Column({ name: 'max_servers', nullable: false, type: 'smallint' })
  public maxServers: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;
}
