import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import { Show } from 'src/entities';
import { showUrl } from 'src/config';
import { ShowsApiReponse } from 'src/types/interfaces';
import ShowRepository from 'src/repositories/show.repository';

@Injectable()
class ShowService extends FetchService {
  private basePath: string;
  private showRepository: ShowRepository;

  constructor(showRepository: ShowRepository) {
    super();
    this.basePath = showUrl;
    this.showRepository = showRepository;
  }

  private async getExternalLinks(id: number): Promise<string> {
    const path: string = `${this.basePath}/${id}/external_ids`;
    const externalIds = await this.get<{ imdb_id: string }>({ path });

    return externalIds.imdb_id;
  }

  public async getShowById(id: number, language: string): Promise<Show> {
    const path: string = `${this.basePath}/${id}`;
    const queryParams = { language };
    const show: Show = await this.get({ path, queryParams });
    const imdbId = await this.getExternalLinks(id);
    show.imdb_id = imdbId;

    return show;
  }

  public async getShowFromDB(showId: number): Promise<Show> {
    try {
      const show: Show = await this.showRepository.findOneByOrFail({ id: showId });
      return show;
    } catch (_e) {
      const apiShow: Show = await this.getShowById(showId, 'en');
      const show: Show = await this.showRepository.save(apiShow);
      return show;
    }
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
    const path: string = `${this.basePath}/top_rated`;
    const queryParams = { language };
    const topRatedShowsResponse = await this.get<ShowsApiReponse>({ path, queryParams });

    return this.getFullDetailedShows(topRatedShowsResponse.results, language);
  }
}

export default ShowService;
