import { Entity, Column } from 'typeorm';

import BaseEntity from './base.entity';

@Entity({ name: 'users' })
class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarURL: string;

  @Column({ default: null })
  accountActivationToken: string;

  @Column({ default: null })
  resetPasswordToken: string;
}

export default User;
