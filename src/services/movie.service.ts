import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import { Movie } from 'src/entities';
import { movieUrl } from 'src/config';

@Injectable()
class MovieService extends FetchService {
  private basePath: string;

  constructor() {
    super();
    this.basePath = movieUrl;
  }

  public getMovieById(id: number, language: string): Promise<Movie> {
    const path: string = `${this.basePath}/${id}`;
    const queryParams = { language };

    return this.get({ path, queryParams });
  }
}

export default MovieService;