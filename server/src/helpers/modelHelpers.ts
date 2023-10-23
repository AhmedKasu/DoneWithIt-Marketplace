import { DataType } from 'sequelize-typescript';

const requiredIntegerColumn = () => ({
  type: DataType.INTEGER,
  allowNull: false,
});

const requiredStringColumn = () => ({
  type: DataType.STRING,
  allowNull: false,
});

export { requiredIntegerColumn, requiredStringColumn };
