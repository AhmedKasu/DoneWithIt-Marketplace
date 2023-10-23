import { DataType } from 'sequelize-typescript';
import { Migration } from '../utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().changeColumn(
      'products',
      'user_id',
      {
        type: DataType.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      { transaction }
    );
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().changeColumn(
      'products',
      'user_id',
      {
        type: DataType.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      { transaction }
    );
  });
};
