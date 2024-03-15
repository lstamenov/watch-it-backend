import { Injectable } from '@nestjs/common';
import FetchService from './fetch.service';
import { Show } from 'src/entities';
import { showUrl } from 'src/config';

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
}

export default ShowService;
