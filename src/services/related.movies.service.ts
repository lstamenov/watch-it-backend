import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import MovieService from './movie.service';
import { movieUrl } from 'src/config';
import { Movie } from 'src/entities';
import { MoviesApiReponse } from 'src/types/interfaces';

@Injectable()
class RelatedMoviesService extends FetchService {
  private basePath: string;
  private movieService: MovieService;

  constructor(movieService: MovieService) {
    super();
    this.basePath = movieUrl;
    this.movieService = movieService;
  }

  public async getSimilarMovies(movieId: number, language: string): Promise<Movie[]> {
    const path: string = `${this.basePath}/${movieId}/similar`;
    const queryParams = { language };
    const similarMoviesResponse = await this.get<MoviesApiReponse>({ path, queryParams });

    return this.movieService.getFullDetailedMovies(similarMoviesResponse.results, language);
  }

  public async getRecommendedMovies(movieId: number, language: string): Promise<Movie[]> {
    const path: string = `${this.basePath}/${movieId}/recommendations`;
    const queryParams = { language };
    const recommendedMoviesResponse = await this.get<MoviesApiReponse>({ path, queryParams });

    return this.movieService.getFullDetailedMovies(recommendedMoviesResponse.results, language);
  }
}

export default RelatedMoviesService;
