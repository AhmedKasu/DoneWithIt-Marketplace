import {
  DataType,
  HasMany,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from './User';
import { Message } from './Message';
import { Product } from './Product';

import {
  requiredIntegerColumn,
  requiredStringColumn,
} from '../helpers/modelHelpers';
import { ChatRoom as ChatRoomType } from '../types';

@Table({ timestamps: true })
export class ChatRoom extends Model<ChatRoomType> {
  @PrimaryKey
  @Column(requiredStringColumn())
  id!: ChatRoomType['id'];

  @ForeignKey(() => User)
  @Column(requiredIntegerColumn())
  buyerId!: ChatRoomType['buyerId'];

  @BelongsTo(() => User, { as: 'buyer', foreignKey: 'buyerId' })
  buyer!: User;

  @ForeignKey(() => User)
  @Column(requiredIntegerColumn())
  sellerId!: ChatRoomType['sellerId'];

  @BelongsTo(() => User, { as: 'seller', foreignKey: 'sellerId' })
  seller!: User;

  @ForeignKey(() => Product)
  @Column(requiredIntegerColumn())
  productId!: ChatRoomType['productId'];

  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => Message)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  lastReadMessageId!: ChatRoomType['lastReadMessageId'];

  @BelongsTo(() => Message, {
    as: 'lastReadMessage',
    foreignKey: 'lastReadMessageId',
  })
  lastReadmessage!: Message;

  @HasMany(() => Message, { as: 'messages' })
  messages!: Message[];
}
