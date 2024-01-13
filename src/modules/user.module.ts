import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import UserRepository from '../repositories/user.repository';
import { User } from '../entities';
import AuthenticationModule from './authentication.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthenticationModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export default class UserModule {}
