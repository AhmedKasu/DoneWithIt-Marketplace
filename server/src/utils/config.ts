import { load } from 'ts-dotenv';

type Env = {
  PORT?: number;
  NODE_ENV?: 'development' | 'production' | 'test';
  DATABASE_URL: string;
};

const env: Env = load({
  PORT: { type: Number, optional: true, default: 3001 },
  NODE_ENV: {
    type: ['production', 'test'],
    optional: true,
    default: 'development',
  },
  DATABASE_URL: String,
}) as Env;

const PORT = env.PORT;
const NODE_ENV = env.NODE_ENV;
const DATABASE_URL = env.DATABASE_URL;

export { NODE_ENV, PORT, DATABASE_URL };
