import 'express';
import type { AuthUser, Product, Category, User, ChatRoom } from '../types';
import { Model } from 'sequelize-typescript';

export type EntityKeys = 'product' | 'category' | 'user' | 'chatRoom';

export interface ProductInstance extends Model<Product>, Product {}
export interface CategoryInstance extends Model<Category>, Category {}
export interface UserInstance extends Model<User>, ReqUser {}
export interface ChatRoomInstance extends Model<ChatRoom>, ChatRoom {}

export type EntitiyTypes =
  | ProductInstance
  | CategoryInstance
  | UserInstance
  | ChatRoomInstance
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
