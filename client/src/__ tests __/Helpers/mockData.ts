import { Product as Product } from '../../types';

interface MockProduct extends Product {
  priceHistories: [{ price: number; createdAt: string }] | [];
  seller: {
    id: number;
    name: string;
    createdAt: string;
  };
}
const products: MockProduct[] = [
  {
    id: 1,
    userId: 1,
    category: {
      name: 'Electronics',
    },
    title: 'Product 1',
    price: 100,
    description: 'This is product 1',
    imageUrls: ['https://example.com/product1.jpg'],
    status: 'available',
    condition: 'New',
    priceHistories: [],
    seller: {
      id: 1,
      name: 'Seller 1',
      createdAt: '2023-01-01T00:00:00',
    },
  },
  {
    id: 2,
    userId: 2,
    category: {
      name: 'Entertainment',
    },
    title: 'Product 2',
    price: 200,
    description: 'This is product 2',
    imageUrls: [
      'https://example.com/product2.jpg',
      'https://example.com/product2-2.jpg',
    ],
    status: 'sold',
    condition: 'Used - Like New',
    priceHistories: [
      {
        price: 200,
        createdAt: '2023-01-02T00:00:00',
      },
    ],
    seller: {
      id: 2,
      name: 'Seller 2',
      createdAt: '2023-01-02T00:00:00',
    },
  },
  {
    id: 3,
    userId: 3,
    category: {
      name: 'Free Stuff',
    },
    title: 'Product 3',
    price: 300,
    description: 'This is product 3',
    imageUrls: ['https://example.com/product3.jpg'],
    status: 'pending',
    condition: 'Used - Good',
    priceHistories: [],
    seller: {
      id: 3,
      name: 'Seller 3',
      createdAt: '2023-01-03T00:00:00',
    },
  },
];

export { products };
