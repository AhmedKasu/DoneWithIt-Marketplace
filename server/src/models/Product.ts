import {
  AutoIncrement,
  BelongsTo,
  CreatedAt,
  Column,
  ForeignKey,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { User } from './User';
import { Category } from './Category';

import {
  requiredStringColumn,
  requiredIntegerColumn,
} from '../helpers/modelHelpers';

@Table
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: number;

  @ForeignKey(() => User)
  @Column(requiredIntegerColumn())
  userId!: number;

  @ForeignKey(() => Category)
  @Column(requiredIntegerColumn())
  categoryId!: number;

  @Column(requiredStringColumn())
  title!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      max: {
        args: [30000],
        msg: 'Price cannot exceed 30,000',
      },
      min: {
        args: [1],
        msg: 'Price must be greater than 0',
      },
    },
  })
  price!: number;

  @Column(requiredStringColumn())
  description!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  imageUrls!: string[];

  @Column({
    type: DataType.ENUM('available', 'sold', 'pending'),
    allowNull: false,
    defaultValue: 'available',
  })
  status!: 'available' | 'sold' | 'pending';

  @Column({
    type: DataType.ENUM,
    values: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'],
    allowNull: false,
    defaultValue: 'Used - Good',
  })
  condition!: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt!: Date;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Category)
  category!: Category;
}
