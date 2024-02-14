import { Migration } from '../utils/umzug';
import { DataType } from 'sequelize-typescript';

export const up: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize.getQueryInterface().addColumn(
      'chat_rooms',
      'last_read_message_id',
      {
        type: DataType.INTEGER,
        references: {
          model: 'messages',
          key: 'id',
        },
        allowNull: true,
      },
      { transaction }
    );
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  return sequelize.transaction(async (transaction) => {
    await sequelize
      .getQueryInterface()
      .removeColumn('chat_rooms', 'last_read_message_id', { transaction });
  });
};
