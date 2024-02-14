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

export interface PriceHistory {
  id: number;
  productId: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type Categories =
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
  name: Categories;
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

export interface InitChat {
  buyerId: number;
  sellerId: number;
  productId: number;
}

export interface Message {
  id?: number;
  chatRoomId: string;
  senderId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChatRoom {
  id: string;
  buyerId: number;
  sellerId: number;
  productId: number;
  lastReadMessageId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
