import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './db';

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
