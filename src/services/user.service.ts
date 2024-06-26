import { Injectable } from '@nestjs/common';
import UserDto, { UpdateUserPassword } from 'src/dtos/user.dto';
import { Movie, Show, User } from 'src/entities';
import UserRepository from 'src/repositories/user.repository';
import HashService from './hash.service';
import AuthenticationService from './authentication.service';
import ShowService from './show.service';
import { MovieNotFoundError, ShowNotFoundError, UserNotFoundError } from 'src/errors';
import MovieService from './movie.service';

@Injectable()
class UserService {
  private userRepository: UserRepository;
  private hashService: HashService;
  private authenticationService: AuthenticationService;
  private showService: ShowService;
  private movieService: MovieService;

  constructor(
    userRepository: UserRepository,
    hashService: HashService,
    authenticationService: AuthenticationService,
    showService: ShowService,
    movieService: MovieService,
  ) {
    this.userRepository = userRepository;
    this.hashService = hashService;
    this.authenticationService = authenticationService;
    this.showService = showService;
    this.movieService = movieService;
  }

  public async getUserById(userId: number): Promise<User> {
    const user: User = await this.userRepository.findOneByOrFail({ id: userId });
    delete user.password;

    return user;
  }

  public async createUser(userDto: UserDto): Promise<User> {
    const { password, ...userProps } = userDto;
    const hashedPassword: string = await this.hashService.hashPassword(password);
    const userEntity: User = this.userRepository.create({ ...userProps, password: hashedPassword });
    const user: User = await this.userRepository.save(userEntity);

    return user;
  }

  public async loginUser(userDto: Omit<UserDto, 'email'>): Promise<{ user: User; token: string }> {
    const user: User = await this.userRepository.findOneByOrFail({ username: userDto.username });
    const arePasswordsMatching = await this.hashService.comparePasswords(userDto.password, user.password);

    if (!arePasswordsMatching) {
      throw new Error();
    }

    const token = this.authenticationService.generateToken(user.id);
    return { user, token };
  }

  public async updateAvatar(userId: number, avatarURL: string): Promise<void> {
    this.userRepository.update({ id: userId }, { avatarURL });
  }

  public async changePassword(userId: number, passwordData: UpdateUserPassword): Promise<void> {
    const { newPassword, oldPassword } = passwordData;
    const user: User = await this.userRepository.findOneByOrFail({ id: userId });
    const arePasswordsMatching: boolean = await this.hashService.comparePasswords(oldPassword, user.password);

    if (!arePasswordsMatching) {
      throw new Error();
    }

    const hashedPassword: string = await this.hashService.hashPassword(newPassword);
    await this.userRepository.update({ id: userId }, { password: hashedPassword });
  }

  public async addShowToFavourites(userId: number, showId: number): Promise<void> {
    const user: User = await this.userRepository.findOne({ where: { id: userId }, relations: ['favouriteShows'] });
    const show: Show = await this.showService.getShowFromDB(showId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!show) {
      throw new ShowNotFoundError();
    }

    const isShowAlreadyAdded: boolean = !!user.favouriteShows.find(({ id }) => id === showId);

    if (isShowAlreadyAdded) {
      return;
    }

    user.favouriteShows.push(show);
    this.userRepository.save(user);
  }

  public async removeShowFromFavourites(userId: number, showId: number): Promise<void> {
    const user: User = await this.userRepository.findOne({ where: { id: userId }, relations: ['favouriteShows'] });

    if (!user) {
      throw new UserNotFoundError();
    }

    const isShowAlreadyAdded: boolean = !!user.favouriteShows.find(({ id }) => id === showId);

    if (!isShowAlreadyAdded) {
      return;
    }

    user.favouriteShows = user.favouriteShows.filter(({ id }) => id !== showId);

    this.userRepository.save(user);
  }

  public async addMovieToFavourites(userId: number, movieId: number): Promise<void> {
    const user: User = await this.userRepository.findOne({ where: { id: userId }, relations: ['favouriteMovies'] });
    const movie: Movie = await this.movieService.getMovieFromDB(movieId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (!movie) {
      throw new MovieNotFoundError();
    }

    const isMovieAlreadyAdded: boolean = !!user.favouriteMovies.find(({ id }) => id === movieId);

    if (isMovieAlreadyAdded) {
      return;
    }

    user.favouriteMovies.push(movie);
    this.userRepository.save(user);
  }

  public async removeMovieFromFavourites(userId: number, showId: number): Promise<void> {
    const user: User = await this.userRepository.findOne({ where: { id: userId }, relations: ['favouriteMovies'] });

    if (!user) {
      throw new UserNotFoundError();
    }

    const isMovieAlreadyAdded: boolean = !!user.favouriteMovies.find(({ id }) => id === showId);

    if (!isMovieAlreadyAdded) {
      return;
    }

    user.favouriteMovies = user.favouriteMovies.filter(({ id }) => id !== showId);

    this.userRepository.save(user);
  }
}

export default UserService;
