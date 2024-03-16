import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import { trendingMediaUrl } from 'src/config';
import MovieService from './movie.service';
import ShowService from './show.service';
import { Movie, Show } from 'src/entities';
import TrendingMedia from 'src/entities/trending.media.entity';
import { TrendingMediaApiResponse } from 'src/types/interfaces';

@Injectable()
class TrendingMediaService extends FetchService {
  private basePath: string;
  private movieService: MovieService;
  private showService: ShowService;

  constructor(movieService: MovieService, showService: ShowService) {
    super();
    this.basePath = trendingMediaUrl;
    this.movieService = movieService;
    this.showService = showService;
  }

  private async getFullDetailedMedia(media: TrendingMedia, language: string): Promise<Show | Movie> {
    if (media.media_type === 'movie') {
      return this.movieService.getMovieById(media.id, language);
    }

    return this.showService.getShowById(media.id, language);
  }

  public async getTrendingMedia(language: string, page: number): Promise<(Movie | Show)[]> {
    const path: string = `${this.basePath}/all`;
    const queryParams = { language, page: page.toString() };
    const trendingMediaResponse: TrendingMediaApiResponse = await this.get<TrendingMediaApiResponse>({
      path,
      queryParams,
    });
    const fullDetailedMedia: Promise<Movie | Show>[] = trendingMediaResponse.results.map((media) =>
      this.getFullDetailedMedia(media, language),
    );

    return Promise.all(fullDetailedMedia);
  }
}

export default TrendingMediaService;
