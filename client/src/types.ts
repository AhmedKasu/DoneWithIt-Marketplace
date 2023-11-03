import { AxiosError } from 'axios';
export interface ErrorResponse {
  name: string;
  details: string;
}

export type CustomAxiosError = AxiosError<ErrorResponse>;

export interface Product {
  id: number;
  userId: number;
  categoryId: {
    name: string;
  };
  title: string;
  price: number;
  description: string;
  imageUrls: string[];
  status: 'available' | 'sold' | 'pending';
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  createdAt?: Date;
  updatedAt?: Date;
}

export type Categories =
  | 'Electronics'
  | 'Entertainment'
  | 'Free Stuff'
  | 'Garden & Outdoor'
  | 'Clothing'
  | 'Home Appliances'
  | 'Hobbies'
  | 'Sporting Goods'
  | 'Toys & Games'
  | 'Pet Supplies';
