import { Module } from '@nestjs/common';

import DatabaseModule from '../db';
import UserModule from '../modules/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
