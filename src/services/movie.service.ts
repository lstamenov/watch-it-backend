import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import { Movie } from 'src/entities';
import { movieUrl } from 'src/config';
import { MoviesApiReponse } from 'src/types/interfaces';
import MovieRepository from 'src/repositories/movie.repository';

@Injectable()
class MovieService extends FetchService {
  private basePath: string;
  private movieRepository: MovieRepository;

  constructor(movieRepository: MovieRepository) {
    super();
    this.basePath = movieUrl;
    this.movieRepository = movieRepository;
  }

  private async getExternalLinks(id: number): Promise<string> {
    const path: string = `${this.basePath}/${id}/external_ids`;
    const externalIds = await this.get<{ imdb_id: string }>({ path });

    return externalIds.imdb_id;
  }

  public async getMovieById(id: number, language: string): Promise<Movie> {
    const path: string = `${this.basePath}/${id}`;
    const queryParams = { language };
    const movie: Movie = await this.get({ path, queryParams });
    const imdbId = await this.getExternalLinks(id);
    movie.imdb_id = imdbId;

    return movie;
  }

  public async getMovieFromDB(movieId: number): Promise<Movie> {
    try {
      const movie: Movie = await this.movieRepository.findOneByOrFail({ id: movieId });
      return movie;
    } catch (_e) {
      const apiMovie: Movie = await this.getMovieById(movieId, 'en');
      const movie: Movie = await this.movieRepository.save(apiMovie);
      return movie;
    }
  }

  public async getFullDetailedMovies(content: Movie[], language: string): Promise<Movie[]> {
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
