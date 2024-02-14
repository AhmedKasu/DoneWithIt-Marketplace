import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from './User';
import { ChatRoom } from './ChatRoom';

import {
  requiredIntegerColumn,
  requiredStringColumn,
} from '../helpers/modelHelpers';
import { Message as MessageType } from '../types';

@Table({ timestamps: true })
export class Message extends Model<MessageType> {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: MessageType['id'];

  @ForeignKey(() => User)
  @Column(requiredIntegerColumn())
  senderId!: MessageType['senderId'];

  @BelongsTo(() => User, { as: 'sender', foreignKey: 'senderId' })
  sender!: User;

  @ForeignKey(() => ChatRoom)
  @Column(requiredIntegerColumn())
  chatRoomId!: MessageType['chatRoomId'];

  @BelongsTo(() => ChatRoom, { onDelete: 'CASCADE' })
  chatRoom!: ChatRoom;

  @Column(requiredStringColumn())
  content!: MessageType['content'];
}
