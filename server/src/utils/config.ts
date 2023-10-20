import { load } from 'ts-dotenv';

type Env = {
  PORT?: number;
  NODE_ENV?: 'development' | 'production' | 'test';
};

const env: Env = load({
  PORT: { type: Number, optional: true, default: 3001 },
  NODE_ENV: {
    type: ['production', 'test'],
    optional: true,
    default: 'development',
  },
}) as Env;

const PORT = env.PORT;
const NODE_ENV = env.NODE_ENV;

export { NODE_ENV, PORT };
