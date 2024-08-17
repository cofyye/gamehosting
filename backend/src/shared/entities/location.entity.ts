import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MachineEntity } from './machine.entity';

@Entity({
  name: 'locations',
})
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'country', nullable: false, length: 50 })
  public country: string;

  @Column({
    name: 'country_tag',
    nullable: false,
    length: 10,
  })
  public countryTag: string;

  @Column({ name: 'city', nullable: false, length: 50 })
  public city: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;

  // Relations

  @OneToMany(() => MachineEntity, (machine) => machine.location)
  machines?: MachineEntity[];
}
