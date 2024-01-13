import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import UserRepository from '../repositories/user.repository';
import { User } from '../entities';
import AuthenticationModule from './authentication.module';
import AuthenticationMiddleware from 'src/middlewares/authentication.middleware';
import HashService from 'src/services/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthenticationModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, HashService],
})
export default class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({ path: '/users/authenticate', method: RequestMethod.GET });
  }
}
