import { load } from 'ts-dotenv';

type Env = {
  PORT?: number;
  NODE_ENV?: 'development' | 'production' | 'test';
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  DATABASE_URL: string;
  TEST_DATABASE_URL: string;
  TEST_POSTGRES_PASSWORD: string;
  JWT_SECRET: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
};

const isTest = process.env.NODE_ENV === 'test';
const isDevelopment = process.env.NODE_ENV === 'development';

const env: Env = load({
  JWT_SECRET: String,
  CLOUDINARY_CLOUD_NAME: String,
  CLOUDINARY_API_KEY: String,
  CLOUDINARY_API_SECRET: String,
  PORT: { type: Number, optional: true, default: 3001 },
  NODE_ENV: {
    type: ['production', 'test', 'development'],
    optional: true,
    default: 'development',
  },
  DATABASE_URL: {
    type: String,
    optional: isTest,
  },
  POSTGRES_PASSWORD: { type: String, optional: !isDevelopment },
  POSTGRES_USER: { type: String, optional: !isDevelopment },
  TEST_DATABASE_URL: {
    type: String,
    optional: !isTest,
  },
  TEST_POSTGRES_PASSWORD: { type: String, optional: !isTest },
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
