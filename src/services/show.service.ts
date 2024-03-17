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

  public getShowById(id: number, language: string): Promise<Show> {
    const path: string = `${this.basePath}/${id}`;
    const queryParams = { language };

    return this.get({ path, queryParams });
  }

  public async getShowFromDB(showId: number): Promise<Show> {
    try {
      const show: Show = await this.showRepository.findOneByOrFail({ id: showId });
      return show;
    } catch (_e) {
      const apiShow: Show = await this.getShowById(showId, 'en');
      console.log('################', apiShow);
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
    const path: string = `${this.basePath}/popular`;
    const queryParams = { language };
    const topRatedShowsResponse = await this.get<ShowsApiReponse>({ path, queryParams });

    return this.getFullDetailedShows(topRatedShowsResponse.results, language);
  }
}

export default ShowService;
