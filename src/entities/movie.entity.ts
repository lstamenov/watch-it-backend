import { Column, Entity } from 'typeorm';

import BaseMedia from './base.media.entity';

@Entity({ name: 'movies' })
class Movie extends BaseMedia {
  @Column()
  title: string;

  @Column()
  original_title: string;

  @Column()
  poster_path: string;

  @Column()
  runtime: number;

  @Column()
  release_date: string;

  @Column()
  budget: number;

  @Column()
  revenue: number;

  @Column()
  vote_count: number;

  @Column()
  popularity: number;
}

export default Movie;
