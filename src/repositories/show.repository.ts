import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Show } from '../entities';

@Injectable()
class ShowRepository extends Repository<Show> {
  constructor(dataSource: DataSource) {
    super(Show, dataSource.createEntityManager());
  }
}

export default ShowRepository;
