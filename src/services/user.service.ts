import { Injectable } from '@nestjs/common';

import UserRepository from 'src/repositories/user.repository';
import { User } from 'src/entities';

@Injectable()
class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}

export default UserService;
