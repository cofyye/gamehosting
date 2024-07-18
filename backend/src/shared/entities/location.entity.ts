import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'locations',
})
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'country', nullable: false, unique: true, length: 30 })
  public country: string;

  @Column({ name: 'town', nullable: false, length: 30 })
  public town: string;

  @Column({
    name: 'icon',
    unique: true,
    nullable: false,
    length: 100,
  })
  public icon: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    nullable: false,
  })
  public createdAt: Date;
}
