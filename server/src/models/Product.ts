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

@Table({ tableName: 'products' })
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Category)
  @Column
  categoryId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
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

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  imageUrls!: string;

  @Column({
    type: DataType.ENUM('available', 'sold', 'pending'),
    allowNull: false,
    defaultValue: 'available',
  })
  status!: 'available' | 'sold' | 'pending';

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
