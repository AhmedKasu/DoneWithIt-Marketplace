import { Seeder } from '../utils/umzug';
const testProducts = [
  {
    userId: 1,
    categoryId: 1,
    title: 'Test Ps5',
    price: 1234,
    description: 'This is a test PlayStation 5',
    imageUrls: [
      'https://res.cloudinary.com/dyokok8gk/image/upload/v1702381348/am_done_with_it/wz5n40mcdei38o7pcan3.jpg',
      'https://res.cloudinary.com/dyokok8gk/image/upload/v1702381348/am_done_with_it/hdfm7gob2lgwoc7q2wrs.jpg',
    ],
    status: 'available',
    condition: 'Used - Good',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    userId: 1,
    categoryId: 10,
    title: 'Test cat tree',
    price: 4315,
    description: 'This is a test cat tree for sale.',
    imageUrls: [
      'https://res.cloudinary.com/dyokok8gk/image/upload/v1702381450/am_done_with_it/dnkmahccg2upffmnzhwp.jpg',
    ],
    status: 'available',
    condition: 'New',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Product.bulkCreate(testProducts);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.models.Product.destroy({ where: {} });
};
