import { NODE_ENV } from '../utils/config';
const CLIENT_URL = 'http://localhost:5173';

const CORS_ORIGIN =
  NODE_ENV === 'development' || NODE_ENV === 'test'
    ? CLIENT_URL
    : 'https://patientor.herokuapp.com';

export { CLIENT_URL, CORS_ORIGIN };
