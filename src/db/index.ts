import { TypeOrmModule } from '@nestjs/typeorm';

import { dbType, dbHost, dbPort, dbUsername, dbPassword, dbName } from '../config';
import { Movie, Show, User } from '../entities';

const databaseConfig: TypeOrmModule = {
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  entities: [User, Movie, Show],
  synchronize: true,
};

export default TypeOrmModule.forRoot(databaseConfig);
