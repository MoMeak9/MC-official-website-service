import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Code } from './entity/Code';
import { Paper } from './entity/Paper';
import { Gallery } from './entity/Gallery';

import 'dotenv/config';

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL || 'mysql://root:root@localhost:3306/test',
  type: 'mysql',
  synchronize: true,
  logging: false,
  entities: [User, Code, Paper, Gallery],
  migrations: [],
  subscribers: [],
});
