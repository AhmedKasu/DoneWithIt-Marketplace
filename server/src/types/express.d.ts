import 'express';
import type { AuthUser, Product, Category, User } from '../types';
import { Model } from 'sequelize-typescript';

export type EntityKeys = 'product' | 'category' | 'user';

export interface ProductInstance extends Model<Product>, Product {}
export interface CategoryInstance extends Model<Category>, Category {}
export interface ReqUserInstance extends Model<User>, ReqUser {}

type Entities = {
  [key in EntityKeys]?:
    | ProductInstance
    | CategoryInstance
    | ReqUserInstance
    | null;
};

declare module 'express' {
  export interface Request {
    cookies?: {
      accessToken: string;
    };
    authUser?: AuthUser;
    entities?: Entities;
  }
}
