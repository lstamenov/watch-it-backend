import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import { Movie } from 'src/entities';
import { movieUrl } from 'src/config';
import { MoviesApiReponse } from 'src/types/interfaces';

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

  private async getFullDetailedMovies(content: Movie[], language: string): Promise<Movie[]> {
    const fullDetailedMoviesResponse: Promise<Movie[]> = Promise.all(
      content.map((movie) => this.getMovieById(movie.id, language)),
    );
    return fullDetailedMoviesResponse;
  }

  public async getPopularMovies(language: string): Promise<Movie[]> {
    const path: string = `${this.basePath}/popular`;
    const queryParams = { language };
    const popularMoviesResponse = await this.get<MoviesApiReponse>({ path, queryParams });
    const popularMovies: Movie[] = popularMoviesResponse.results;

    return this.getFullDetailedMovies(popularMovies, language);
  }

  public async getTopRatedMovies(language: string): Promise<Movie[]> {
    const path: string = `${this.basePath}/top_rated`;
    const queryParams = { language };
    const topRatedMoviesResponse = await this.get<MoviesApiReponse>({ path, queryParams });
    const topRatedMovies = topRatedMoviesResponse.results;

    return this.getFullDetailedMovies(topRatedMovies, language);
  }
}

export default MovieService;
