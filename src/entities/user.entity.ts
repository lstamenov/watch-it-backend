import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import BaseEntity from './base.entity';
import Show from './show.entity';
import Movie from './movie.entity';

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

  @ManyToMany(() => Show)
  @JoinTable()
  favouriteShows: Show[];

  @ManyToMany(() => Movie)
  @JoinTable()
  favouriteMovies: Movie[];
}

export default User;
