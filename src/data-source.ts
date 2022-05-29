import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Code } from './entity/Code';

const dotenv = require('dotenv');
dotenv.config();

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/test',
  type: 'mysql',
  synchronize: true,
  logging: false,
  entities: [User, Code],
  migrations: [],
  subscribers: [],
});
