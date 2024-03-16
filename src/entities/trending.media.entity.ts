import { Column, Entity } from 'typeorm';

@Entity({ name: 'trending_media' })
class TrendingMedia {
  @Column()
  adult: boolean;

  @Column()
  backdrop_path: string;

  @Column()
  id: number;

  @Column()
  title: string;

  @Column()
  original_language: string;

  @Column()
  original_title: string;

  @Column()
  overview: string;

  @Column()
  poster_path: string;

  @Column()
  media_type: 'movie' | 'tv';

  @Column()
  genre_ids: number[];

  @Column()
  popularity: number;

  @Column()
  release_date: string;

  @Column()
  video: boolean;

  @Column()
  vote_average: number;

  @Column()
  vote_count: number;
}

export default TrendingMedia;
