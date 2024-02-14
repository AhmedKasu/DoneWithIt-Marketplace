import { Migration } from '../utils/umzug';
import { DataType } from 'sequelize-typescript';

export const up: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().createTable(
      'messages',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataType.INTEGER,
        },
        sender_id: {
          type: DataType.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false,
        },
        chat_room_id: {
          type: DataType.STRING,
          references: {
            model: 'chat_rooms',
            key: 'id',
          },
          allowNull: false,
        },
        content: {
          type: DataType.STRING,
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
    await sequelize.getQueryInterface().dropTable('messages', { transaction });
  });
};
