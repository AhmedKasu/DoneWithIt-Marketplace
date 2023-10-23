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
import {
  requiredIntegerColumn,
  requiredStringColumn,
} from '../helpers/modelHelpers';
@Table({ timestamps: true })
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

  @HasMany(() => Product)
  products!: Product[];
}
