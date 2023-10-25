import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';

import { Product } from './Product';
import { requiredIntegerColumn } from '../helpers/modelHelpers';
import { PriceHistory as PriceHistoryType } from '../types';

@Table({ timestamps: true, tableName: 'price_history' })
export class PriceHistory extends Model<PriceHistoryType> {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: PriceHistoryType['id'];

  @ForeignKey(() => Product)
  @Column(requiredIntegerColumn())
  productId!: PriceHistoryType['productId'];

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
  price!: PriceHistoryType['price'];

  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
  })
  product!: Product;
}
