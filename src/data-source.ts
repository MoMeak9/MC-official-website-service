import 'reflect-metadata';
import { DataSource } from 'typeorm';
import entity from './entity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  url:
    process.env.NODE_ENV === 'development '
      ? process.env.DATABASE_URL
      : process.env.DATABASE_URL_PRODUCTION,
  type: 'mysql',
  synchronize: true,
  logging: false,
  entities: [...entity],
  migrations: [],
  subscribers: [],
});
