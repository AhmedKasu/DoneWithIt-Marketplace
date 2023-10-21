import { DataTypes, Op } from 'sequelize';
import { Migration } from '../utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('categories', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });

  await sequelize.getQueryInterface().createTable('products', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image_urls: { type: DataTypes.STRING, allowNull: false },
    status: {
      type: DataTypes.ENUM('available', 'sold', 'pending'),
      allowNull: false,
      defaultValue: 'available',
    },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  });

  await sequelize.getQueryInterface().addConstraint('products', {
    fields: ['price'],
    type: 'check',
    where: {
      [Op.and]: [{ price: { [Op.gte]: 0 } }, { price: { [Op.lte]: 30000 } }],
    },
    name: 'check_price_range',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('products');
  await sequelize.getQueryInterface().dropTable('categories');
};
