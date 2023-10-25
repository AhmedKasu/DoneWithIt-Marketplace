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
import { Category as CategoryType } from '../types';
@Table({ timestamps: true })
export class Category extends Model<CategoryType> {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: CategoryType['id'];

  @Unique
  @Column(requiredStringColumn())
  name!: CategoryType['name'];

  @HasMany(() => Product)
  products!: Product[];
}
