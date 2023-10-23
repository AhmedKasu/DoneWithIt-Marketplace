import { z } from 'zod';

import { isValidURL } from '.';

const URLSchema = z.string().refine(isValidURL, {
  message: 'Invalid URL',
});

const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Name should have at least 3 characters.')
    .max(50, 'Name should not exceed 50 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password),
      'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    ),
});

const loginSchema = z.object({
  name: userSchema.shape.name,
  password: userSchema.shape.password,
});

const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Title should have at least 3 characters.')
    .max(50, 'Title should not exceed 50 characters.'),
  price: z
    .number()
    .min(1, 'Price must be greater than 0')
    .max(30000, 'Price cannot exceed 30,000'),
  categoryId: z.number().int().positive(),
  condition: z.enum(['New', 'Used - Like New', 'Used - Good', 'Used - Fair']),
  description: z
    .string()
    .min(10, 'Description is too short! Should be at least 10 characters.')
    .max(200, 'Description is too long! Should not exceed 200 characters.'),
  imageUrls: z
    .array(URLSchema)
    .min(1, 'Please provide at least one image.')
    .max(4, 'You can provide a maximum of 4 images.'),
});

export { userSchema, loginSchema, productSchema };
