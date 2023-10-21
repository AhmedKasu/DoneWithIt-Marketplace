require('ts-node/register');

require('./umzug')
  .seeder.runAsCLI()
  .then(() => {
    console.log('Seeding complete');
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
