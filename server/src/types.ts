export interface Product {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  price: number;
  description: string;
  imageUrls: string[];
  status: 'available' | 'sold' | 'pending';
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type AuthUser = Omit<User, 'email' | 'passwordHash'>;
