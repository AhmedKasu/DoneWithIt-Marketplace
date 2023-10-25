import 'express';
import type { AuthUser, Product, Category, User } from '../types';
import { Model } from 'sequelize-typescript';

export type EntityKeys = 'product' | 'category' | 'user';

export interface ProductInstance extends Model<Product>, Product {}
export interface CategoryInstance extends Model<Category>, Category {}
export interface UserInstance extends Model<User>, ReqUser {}

export type EntitiyTypes =
  | ProductInstance
  | CategoryInstance
  | UserInstance
  | null;

export type Entities = {
  [key in EntityKeys]?: EntitiyTypes;
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
