require('ts-node/register');

require('./umzug')
  .migrator.runAsCLI()
  .then(() => {
    console.log('Migration complete');
  })
  .catch((error) => {
    console.error('Error during migration:', error);
    process.exit(1);
  });
