import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from '../entities';

@Injectable()
class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}

export default UserRepository;
