import { Column, Entity } from 'typeorm';

import BaseMedia from './base.media.entity';

@Entity({ name: 'shows' })
class Show extends BaseMedia {
  @Column({ type: 'integer', array: true })
  episode_run_time: number[];

  @Column()
  first_air_date: string;

  @Column()
  homepage: string;

  @Column()
  name: string;

  @Column()
  number_of_episodes: number;

  @Column()
  number_of_seasons: number;

  @Column({ type: 'varchar', array: true })
  origin_country: string[];

  @Column()
  original_language: string;
}

export default Show;
