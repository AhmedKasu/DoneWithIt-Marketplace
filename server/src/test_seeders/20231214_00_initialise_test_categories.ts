import { Seeder } from '../utils/umzug';

const testCategorySeeds = [
  {
    id: 1,
    name: 'Electronics',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    name: 'Garden & Outdoor',
    created_at: new Date(),
    updated_at: new Date(),
  },
  { id: 5, name: 'Clothing', created_at: new Date(), updated_at: new Date() },
  {
    id: 10,
    name: 'Pet Supplies',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Category.bulkCreate(testCategorySeeds);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Category.destroy({ where: {} });
};
