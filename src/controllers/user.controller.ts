import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import UserService from '../services/user.service';
import AuthenticationGuard from 'src/guards/authentication.guard';
import UserDto from 'src/dtos/user.dto';
import { CredentialsInUseError, InvalidCredentialsError } from 'src/errors';
import { Request } from 'src/types/interfaces';

@Controller({ path: '/users' })
class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get('/authenticate')
  @UseGuards(AuthenticationGuard)
  public async authenticateUser(@Req() request: Request) {
    return this.userService.getUserById(request.user.userId);
  }

  @Post('/register')
  public async registerUser(@Body(new ValidationPipe()) userDto: UserDto) {
    try {
      const registeredUser = await this.userService.createUser(userDto);
      return registeredUser;
    } catch (_e) {
      const error: CredentialsInUseError = new CredentialsInUseError();
      return error;
    }
  }

  @Post('/login')
  public async loginUser(@Body(new ValidationPipe()) userDto: Omit<UserDto, 'email'>) {
    try {
      const userData = await this.userService.loginUser(userDto);
      return userData;
    } catch (_e) {
      const error: InvalidCredentialsError = new InvalidCredentialsError();
      return error;
    }
  }
}

export default UserController;
