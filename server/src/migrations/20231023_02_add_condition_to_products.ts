import { Migration } from '../utils/umzug';
import { DataType } from 'sequelize-typescript';

export const up: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().addColumn(
      'products',
      'condition',
      {
        type: DataType.ENUM,
        values: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'],
        allowNull: false,
        defaultValue: 'Used - Good',
      },
      { transaction }
    );
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize
      .getQueryInterface()
      .removeColumn('products', 'condition', { transaction });
    await sequelize
      .getQueryInterface()
      .sequelize.query('DROP TYPE "enum_products_condition"', { transaction });
  });
};
