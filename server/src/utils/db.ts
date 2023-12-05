import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { DATABASE_URL } from '../utils/config';

const sequelizeOptions: SequelizeOptions = {
  logging: false,
  define: {
    underscored: true,
  },
  models: [`${__dirname}/../models/*.{ts,js}`],
};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database', err);
    return process.exit(1);
  }

  return null;
};

export { connectToDatabase, sequelize };
