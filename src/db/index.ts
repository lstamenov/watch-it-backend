import { TypeOrmModule } from '@nestjs/typeorm';

import { dbType, dbHost, dbPort, dbUsername, dbPassword, dbName } from '../config';
import { User } from '../entities';

const databaseConfig: TypeOrmModule = {
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUsername,
  password: dbPassword,
  database: dbName,
  entities: [User],
  synchronize: true,
};

export default TypeOrmModule.forRoot(databaseConfig);
