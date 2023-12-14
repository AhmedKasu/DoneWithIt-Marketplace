import { Seeder } from '../utils/umzug';
const testUser = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  passwordHash: '$2b$10$sTlTQS8FnsHI0eo0gciRBuPX3UR/oIG2UCRBLOcTaGH9Ny2L1Szu2',
  created_at: new Date(),
  updated_at: new Date(),
};

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.User.create(testUser);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.User.destroy({ where: { email: testUser.email } });
};
