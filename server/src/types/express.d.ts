import 'express';

declare module 'express' {
  export interface Request {
    cookies?: {
      accessToken: string;
    };
    user?: {
      id: string;
      name: string;
    };
  }
}
