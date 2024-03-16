import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import { Show } from 'src/entities';
import { showUrl } from 'src/config';
import { ShowsApiReponse } from 'src/types/interfaces';

@Injectable()
class ShowService extends FetchService {
  private basePath: string;

  constructor() {
    super();
    this.basePath = showUrl;
  }

  public getShowById(id: number, language: string): Promise<Show> {
    const path: string = `${this.basePath}/${id}`;
    const queryParams = { language };

    return this.get({ path, queryParams });
  }

  public async getFullDetailedShows(content: Show[], language: string): Promise<Show[]> {
    const fullDetailedShowsResponse: Promise<Show[]> = Promise.all(
      content.map((movie) => this.getShowById(movie.id, language)),
    );
    return fullDetailedShowsResponse;
  }

  public async getPopularShows(language: string): Promise<Show[]> {
    const path: string = `${this.basePath}/popular`;
    const queryParams = { language };
    const popularShowsResponse = await this.get<ShowsApiReponse>({ path, queryParams });

    return this.getFullDetailedShows(popularShowsResponse.results, language);
  }

  public async getTopRatedShows(language: string): Promise<Show[]> {
    const path: string = `${this.basePath}/popular`;
    const queryParams = { language };
    const topRatedShowsResponse = await this.get<ShowsApiReponse>({ path, queryParams });

    return this.getFullDetailedShows(topRatedShowsResponse.results, language);
  }
}

export default ShowService;
