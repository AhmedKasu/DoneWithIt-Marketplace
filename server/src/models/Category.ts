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
export class Category extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: number;

  @Unique
  @Column(requiredStringColumn())
  name!: string;

  @HasMany(() => Product)
  products!: Product[];
}
