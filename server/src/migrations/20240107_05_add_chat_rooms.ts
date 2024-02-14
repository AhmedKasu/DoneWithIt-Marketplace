import { Migration } from '../utils/umzug';
import { DataType } from 'sequelize-typescript';

export const up: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().createTable(
      'chat_rooms',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataType.STRING,
        },
        buyer_id: {
          type: DataType.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false,
        },
        seller_id: {
          type: DataType.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false,
        },
        product_id: {
          type: DataType.INTEGER,
          references: {
            model: 'products',
            key: 'id',
          },
          allowNull: false,
        },
        created_at: {
          allowNull: false,
          type: DataType.DATE,
        },
        updated_at: {
          allowNull: false,
          type: DataType.DATE,
        },
      },
      { transaction }
    );
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize
      .getQueryInterface()
      .dropTable('chat_rooms', { transaction });
  });
};
