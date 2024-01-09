import { Controller } from '@nestjs/common';
import UserService from '../services/user.service';

@Controller({ path: '/users' })
class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
}

export default UserController;
