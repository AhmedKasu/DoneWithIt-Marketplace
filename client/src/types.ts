import { AxiosError } from 'axios';
export interface ErrorResponse {
  name: string;
  details: string;
}

export type CustomAxiosError = AxiosError<ErrorResponse>;

export interface Product {
  id: number;
  userId: number;
  category: {
    name: CategoriesNames;
  };
  title: string;
  price: number;
  priceHistories: {
    price: number;
    createdAt: string;
  }[];
  description: string;
  imageUrls: string[];
  status: 'available' | 'sold' | 'pending';
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
  chatRooms: ChatRoom[];
}

export type CategoriesNames =
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

export interface Category {
  id: number;
  name: CategoriesNames;
}

interface ChatRoomUser {
  id: number;
  name: string;
}

export interface ChatRoomMessage {
  id: number;
  content: string;
  sender: ChatRoomUser;
  createdAt?: string;
}

export interface ChatRoom {
  id: string;
  product: Product;
  messages: ChatRoomMessage[];
  buyer: ChatRoomUser;
  seller: ChatRoomUser;
  lastReadMessage: { id: number };
}
