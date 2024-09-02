import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ServerEntity } from './server.entity';

import { UserRole } from '../enums/role.enum';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'first_name', nullable: false, length: 20 })
  public firstName: string;

  @Column({ name: 'last_name', nullable: false, length: 20 })
  public lastName: string;

  @Column({ name: 'username', unique: true, nullable: false, length: 20 })
  public username: string;

  @Column({ name: 'email', unique: true, nullable: false, length: 100 })
  public email: string;

  @Column({ name: 'password', nullable: false, length: 100 })
  public password: string;

  @Column({ name: 'country', nullable: false, length: 50 })
  public country: string;

  @Column({
    name: 'country_tag',
    nullable: false,
    length: 10,
  })
  public countryTag: string;

  @Column({ name: 'pin_code', nullable: false, length: 5 })
  public pinCode: string;

  @Column({ name: 'verification_token', length: 6, nullable: true })
  public verificationToken: string;

  @Column({ name: 'verification_exp_date', type: 'datetime', nullable: true })
  public verificationExpDate: Date;

  @Column({ name: 'password_token', length: 12, nullable: true })
  public passwordToken: string;

  @Column({ name: 'password_exp_date', type: 'datetime', nullable: true })
  public passwordExpDate: Date;

  @Column({ name: 'verified', default: false, nullable: false })
  public verified: boolean;

  @Column({ name: 'active', default: true, nullable: false })
  public active: boolean;

  @Column({
    name: 'role',
    default: UserRole.USER,
    nullable: false,
    type: 'enum',
    enum: UserRole,
  })
  public role: UserRole;

  @Column({ name: 'money', nullable: false, length: 10, default: '0' })
  public money: string;

  @Column({
    name: 'avatar',
    unique: false,
    nullable: true,
    default: 'default-avatar.png',
    length: 100,
  })
  public avatar: string;

  @CreateDateColumn({
    name: 'registration_date',
    type: 'datetime',
    nullable: false,
  })
  public registrationDate: Date;

  // Relations

  @OneToMany(() => ServerEntity, (server) => server.user)
  servers?: ServerEntity[];
}
