import { Seeder } from '../utils/umzug';
const categorySeeds = [
  { name: 'Electronics', created_at: new Date(), updated_at: new Date() },
  { name: 'Entertainment', created_at: new Date(), updated_at: new Date() },
  { name: 'Free Stuff', created_at: new Date(), updated_at: new Date() },
  { name: 'Garden & Outdoor', created_at: new Date(), updated_at: new Date() },
  { name: 'Clothing', created_at: new Date(), updated_at: new Date() },
  { name: 'Home Appliances', created_at: new Date(), updated_at: new Date() },
  { name: 'Hobbies', created_at: new Date(), updated_at: new Date() },
  { name: 'Sporting Goods', created_at: new Date(), updated_at: new Date() },
  { name: 'Toys & Games', created_at: new Date(), updated_at: new Date() },
  { name: 'Pet Supplies', created_at: new Date(), updated_at: new Date() },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Category.bulkCreate(categorySeeds);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Category.destroy({ where: {} });
};
