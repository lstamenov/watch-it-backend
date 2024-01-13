import { Injectable } from '@nestjs/common';
import UserDto from 'src/dtos/user.dto';
import { User } from 'src/entities';
import UserRepository from 'src/repositories/user.repository';
import HashService from './hash.service';
import AuthenticationService from './authentication.service';

@Injectable()
class UserService {
  private userRepository: UserRepository;
  private hashService: HashService;
  private authenticationService: AuthenticationService;

  constructor(userRepository: UserRepository, hashService: HashService, authenticationService: AuthenticationService) {
    this.userRepository = userRepository;
    this.hashService = hashService;
    this.authenticationService = authenticationService;
  }

  public async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    delete user.password;

    return user;
  }

  public async createUser(userDto: UserDto): Promise<User> {
    const { password, ...userProps } = userDto;
    const hashedPassword: string = await this.hashService.hashPassword(password);
    const userEntity: User = this.userRepository.create({ ...userProps, password: hashedPassword });
    const user = await this.userRepository.save(userEntity);

    return user;
  }

  public async loginUser(userDto: Omit<UserDto, 'email'>): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOneByOrFail({ username: userDto.username });
    const arePasswordsMatching = await this.hashService.comparePasswords(userDto.password, user.password);

    if (!arePasswordsMatching) {
      throw new Error();
    }

    const token = this.authenticationService.generateToken(user.id);
    return { user, token };
  }
}

export default UserService;
