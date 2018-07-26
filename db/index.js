import { Pool } from 'pg';

import databaseConfig from './config';

const env = process.env.NODE_ENV;

let db;

if (env === 'test') {
  db = new Pool(databaseConfig.test);
} else {
  db = new Pool(databaseConfig.development);
}

export default db;
