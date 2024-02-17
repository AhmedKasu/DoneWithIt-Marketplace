import { NODE_ENV } from '../utils/config';

const CLIENT_URL = 'http://localhost:5173';
const CORS_ORIGIN = NODE_ENV === 'production' ? undefined : CLIENT_URL;

export { CLIENT_URL, CORS_ORIGIN };
