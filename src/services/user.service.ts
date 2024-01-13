import { Injectable } from '@nestjs/common';
import UserDto from 'src/dtos/user.dto';
import { User } from 'src/entities';

import UserRepository from 'src/repositories/user.repository';

@Injectable()
class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(userDto: UserDto): Promise<User> {
    const userEntity: User = this.userRepository.create(userDto);
    const user = await this.userRepository.save(userEntity);

    return user;
  }
}

export default UserService;
