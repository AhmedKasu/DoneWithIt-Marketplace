import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { DATABASE_URL, TEST_DATABASE_URL, NODE_ENV } from '../utils/config';

const sequelizeOptions: SequelizeOptions = {
  logging: false,
  define: {
    underscored: true,
  },
  models: [`${__dirname}/../models/*.{ts,js}`],
};

if (NODE_ENV === 'production') {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const databaseUrl = NODE_ENV === 'test' ? TEST_DATABASE_URL : DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, sequelizeOptions);

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
