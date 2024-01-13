import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import UserService from '../services/user.service';
import AuthenticationGuard from 'src/guards/authentication.guard';
import UserDto from 'src/dtos/user.dto';

@Controller({ path: '/users' })
class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get('/')
  @UseGuards(AuthenticationGuard)
  public getUsers() {
    return 'protected users';
  }

  @Post('/register')
  public async registerUser(@Body(new ValidationPipe()) userDto: UserDto) {
    const registeredUser = await this.registerUser(userDto);

    return registeredUser;
  }
}

export default UserController;
