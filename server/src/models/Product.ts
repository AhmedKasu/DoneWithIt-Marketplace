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
import {
  Product as ProductType,
  PriceHistory as PriceHistoryType,
} from '../types';

@Table({ timestamps: true })
export class Product extends Model<ProductType> {
  @PrimaryKey
  @AutoIncrement
  @Column(requiredIntegerColumn())
  id!: ProductType['id'];

  @ForeignKey(() => User)
  @Column(requiredIntegerColumn())
  userId!: ProductType['userId'];

  @ForeignKey(() => Category)
  @Column(requiredIntegerColumn())
  categoryId!: ProductType['categoryId'];

  @Column(requiredStringColumn())
  title!: ProductType['title'];

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
  price!: ProductType['price'];

  @Column(requiredStringColumn())
  description!: ProductType['description'];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  imageUrls!: ProductType['imageUrls'];

  @Column({
    type: DataType.ENUM('available', 'sold', 'pending'),
    allowNull: false,
    defaultValue: 'available',
  })
  status!: ProductType['status'];

  @Column({
    type: DataType.ENUM,
    values: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'],
    allowNull: false,
    defaultValue: 'Used - Good',
  })
  condition!: ProductType['condition'];

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
        productId: instance.id,
        price: instance.price,
      } as PriceHistoryType);
    }
  }
}
