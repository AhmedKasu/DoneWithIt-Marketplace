import {
  AutoIncrement,
  AfterUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from './User';
import { Category } from './Category';
import { PriceHistory } from './PriceHistory';

import {
  requiredStringColumn,
  requiredIntegerColumn,
} from '../helpers/modelHelpers';

@Table({ timestamps: true })
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

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
  })
  seller!: User;

  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(() => PriceHistory)
  priceHistories!: PriceHistory[];

  @AfterUpdate
  static async updatePriceHistory(instance: Product) {
    if (instance.changed('price')) {
      await PriceHistory.create({
        product_id: instance.id,
        price: instance.price,
      });
    }
  }
}
