import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Movie } from '../entities';

@Injectable()
class MovieRepository extends Repository<Movie> {
  constructor(dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }
}

export default MovieRepository;
