import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import UserService from '../services/user.service';
import AuthenticationGuard from 'src/guards/authentication.guard';
import UserDto, { UpdateFavourites, UpdateUserAvatar, UpdateUserPassword } from 'src/dtos/user.dto';
import { CredentialsInUseError, InvalidCredentialsError } from 'src/errors';
import { Request, Response } from 'src/types/interfaces';
import AppError from 'src/errors/app.error';

@Controller({ path: '/users' })
class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post('/register')
  public async registerUser(@Body(new ValidationPipe()) userDto: UserDto, @Res() res: Response) {
    try {
      const registeredUser = await this.userService.createUser(userDto);
      return res.status(HttpStatus.OK).send(registeredUser);
    } catch (_e) {
      const error: CredentialsInUseError = new CredentialsInUseError();
      return res.status(error.statusCode).send(error);
    }
  }

  @Post('/login')
  public async loginUser(@Body(new ValidationPipe()) userDto: Omit<UserDto, 'email'>, @Res() res: Response) {
    try {
      const userData = await this.userService.loginUser(userDto);
      return res.status(HttpStatus.OK).send(userData);
    } catch (_e) {
      const error: InvalidCredentialsError = new InvalidCredentialsError();
      return res.status(error.statusCode).send(error);
    }
  }

  @Get('/authenticate')
  @UseGuards(AuthenticationGuard)
  public async authenticateUser(@Req() request: Request) {
    return this.userService.getUserById(request.user.userId);
  }

  @Put('/avatar')
  @UseGuards(AuthenticationGuard)
  public async updateAvatar(
    @Body(new ValidationPipe()) body: UpdateUserAvatar,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const { avatarURL } = body;
      const {
        user: { userId },
      } = request;
      await this.userService.updateAvatar(userId, avatarURL);

      return res.status(HttpStatus.OK).send();
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/password')
  @UseGuards(AuthenticationGuard)
  public async changePassword(
    @Body(new ValidationPipe()) body: UpdateUserPassword,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const {
        user: { userId },
      } = request;
      await this.userService.changePassword(userId, body);

      return res.status(HttpStatus.OK).send();
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Put('/favourites/shows')
  @UseGuards(AuthenticationGuard)
  public async addShowToFavourites(
    @Body(new ValidationPipe()) body: UpdateFavourites,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const {
        user: { userId },
      } = request;
      const { id } = body;

      await this.userService.addShowToFavourites(userId, id);

      return res.status(200).send();
    } catch (e) {
      const { message, statusCode } = e as AppError;
      return res.status(statusCode).send({ message });
    }
  }

  @Delete('/favourites/shows/:id')
  @UseGuards(AuthenticationGuard)
  public async removeShowFromFavourites(@Req() request: Request, @Res() res: Response) {
    try {
      const {
        user: { userId },
      } = request;
      const showId = Number(request.params.id);

      await this.userService.removeShowFromFavourites(userId, showId);

      return res.status(200).send();
    } catch (e) {
      const { message, statusCode } = e as AppError;
      return res.status(statusCode).send({ message });
    }
  }

  @Put('/favourites/movies')
  @UseGuards(AuthenticationGuard)
  public async addMovieToFavourites(
    @Body(new ValidationPipe()) body: UpdateFavourites,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    try {
      const {
        user: { userId },
      } = request;
      const { id } = body;

      await this.userService.addMovieToFavourites(userId, id);

      return res.status(200).send();
    } catch (e) {
      const { message, statusCode } = e as AppError;
      return res.status(statusCode).send({ message });
    }
  }

  @Delete('/favourites/movies/:id')
  @UseGuards(AuthenticationGuard)
  public async removeMovieFromFavourites(@Req() request: Request, @Res() res: Response) {
    try {
      const {
        user: { userId },
      } = request;
      const movieId = Number(request.params.id);

      await this.userService.removeMovieFromFavourites(userId, movieId);

      return res.status(200).send();
    } catch (e) {
      const { message, statusCode } = e as AppError;
      return res.status(statusCode).send({ message });
    }
  }
}

export default UserController;
