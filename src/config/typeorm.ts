import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/**/*.entity.{js,ts}'],
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};