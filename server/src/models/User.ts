import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

import { Product } from './Product';
import {
  requiredIntegerColumn,
  requiredStringColumn,
} from '../helpers/modelHelpers';
@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: number;

  @Unique
  @Column(requiredStringColumn())
  email!: string;

  @Column(requiredStringColumn())
  name!: string;

  @Column(requiredStringColumn())
  passwordHash!: string;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt!: Date;

  @HasMany(() => Product)
  products!: Product[];
}
