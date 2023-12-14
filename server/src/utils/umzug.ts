import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './db';
import { NODE_ENV } from './config';

const migrator = new Umzug({
  migrations: {
    glob: ['../migrations/*.ts', { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

type Migration = typeof migrator._types.migration;

export { migrator, Migration };

const seedersPath =
  NODE_ENV === 'test' ? '../test_seeders/*.ts' : '../seeders/*.ts';

export const seeder = new Umzug({
  migrations: {
    glob: [seedersPath, { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  logger: console,
});

export type Seeder = typeof seeder._types.migration;
