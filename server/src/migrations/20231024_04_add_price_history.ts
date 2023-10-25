import { DataTypes, Op } from 'sequelize';
import { Migration } from '../utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().createTable(
      'price_history',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        price: { type: DataTypes.INTEGER, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE, allowNull: false },
      },
      { transaction }
    );

    await sequelize.getQueryInterface().addConstraint('price_history', {
      fields: ['price'],
      type: 'check',
      where: {
        [Op.and]: [{ price: { [Op.gte]: 0 } }, { price: { [Op.lte]: 30000 } }],
      },
      name: 'check_price_range',
      transaction,
    });
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().dropTable('price_history', {
      transaction,
    });
  });
};
