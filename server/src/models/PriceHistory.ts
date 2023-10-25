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

@Table({ timestamps: true, tableName: 'price_history' })
export class PriceHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: number;

  @ForeignKey(() => Product)
  @Column(requiredIntegerColumn())
  product_id!: number;

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

  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
  })
  product!: Product;
}
