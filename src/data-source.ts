import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/test',
  type: 'mysql',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: [],
  subscribers: [],
});
