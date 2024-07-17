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

  @Column({ name: 'name', nullable: false, length: 30 })
  public name: string;

  @Column({
    name: 'icon',
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
