import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { Product } from './Product';
import { ChatRoom } from './ChatRoom';

import {
  requiredIntegerColumn,
  requiredStringColumn,
} from '../helpers/modelHelpers';
import { User as UserType } from '../types';
@Table({ timestamps: true })
export class User extends Model<UserType> {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: UserType['id'];

  @Unique
  @Column(requiredStringColumn())
  email!: UserType['email'];

  @Column(requiredStringColumn())
  name!: UserType['name'];

  @Column(requiredStringColumn())
  passwordHash!: UserType['passwordHash'];

  @HasMany(() => Product)
  products!: Product[];

  @HasMany(() => ChatRoom, { as: 'buyerChatRooms', foreignKey: 'buyerId' })
  buyerChatRooms!: ChatRoom[];

  @HasMany(() => ChatRoom, { as: 'sellerChatRooms', foreignKey: 'sellerId' })
  sellerChatRooms!: ChatRoom[];
}
