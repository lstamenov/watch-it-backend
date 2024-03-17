import { Column, PrimaryColumn } from 'typeorm';

abstract class BaseMedia {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  imdb_id: string;

  @Column()
  original_language: string;

  @Column({ type: 'decimal' })
  vote_average: number;

  @Column()
  backdrop_path: string;

  @Column()
  poster_path: string;

  @Column()
  overview: string;

  @Column()
  media_type: string;
}

export default BaseMedia;
