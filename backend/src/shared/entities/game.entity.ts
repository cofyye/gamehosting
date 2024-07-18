import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'games',
})
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'name', nullable: false, unique: true, length: 30 })
  public name: string;

  @Column({ name: 'tag', nullable: false, unique: true, length: 10 })
  public tag: string;

  @Column({
    name: 'icon',
    unique: true,
    nullable: false,
    length: 100,
  })
  public icon: string;

  @Column({
    name: 'price_per_slot',
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  public pricePerSlot: number;

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
}
