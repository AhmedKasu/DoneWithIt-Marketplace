import { Seeder } from '../utils/umzug';

const categorySeeds = [
  { name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Entertainment', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Free Stuff', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Garden & Outdoor', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Clothing', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Home Appliances', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Hobbies', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Sporting Goods', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Toys & Games', createdAt: new Date(), updatedAt: new Date() },
  { name: 'Pet Supplies', createdAt: new Date(), updatedAt: new Date() },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Category.bulkCreate(categorySeeds);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Category.destroy({ where: {} });
};
