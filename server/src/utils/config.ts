import { load } from 'ts-dotenv';

type Env = {
  PORT?: number;
  NODE_ENV?: 'development' | 'production' | 'test';
  DATABASE_URL: string;
  TEST_DATABASE_URL: string;
  JWT_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

const env: Env = load({
  PORT: { type: Number, optional: true, default: 3001 },
  NODE_ENV: {
    type: ['production', 'test'],
    optional: true,
    default: 'development',
  },
  DATABASE_URL: String,
  TEST_DATABASE_URL: String,
  JWT_SECRET: String,
  CLOUDINARY_CLOUD_NAME: String,
  CLOUDINARY_API_KEY: String,
  CLOUDINARY_API_SECRET: String,
}) as Env;

const PORT = env.PORT;
const NODE_ENV = env.NODE_ENV;
const DATABASE_URL = env.DATABASE_URL;
const TEST_DATABASE_URL = env.TEST_DATABASE_URL;
const JWT_SECRET = env.JWT_SECRET;
const CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET;

export {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  TEST_DATABASE_URL,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
