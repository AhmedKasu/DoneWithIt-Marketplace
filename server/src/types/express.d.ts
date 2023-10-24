import 'express';
import type { Product, Category, User } from '../types';

export type ReqUser = Omit<User, 'email' | 'passwordHash'>;

export type EntityKeys = 'product' | 'category' | 'user';

type Entities = {
  [key in EntityKeys]?: Product | Category | ReqUser | null;
};

declare module 'express' {
  export interface Request {
    cookies?: {
      accessToken: string;
    };
    entities?: Entities;
  }
}
