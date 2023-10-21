import { z } from 'zod';

const userSchema = z.object({
  name: z
    .string()
    .min(3, 'Name should have at least 3 characters.')
    .max(50, 'Name should not exceed 50 characters.'),

  email: z.string().email('Invalid email address.'),

  password: z
    .string()
    .min(8, 'Password should have at least 8 characters.')
    .max(30, 'Password should not exceed 30 characters.'),
});

export { userSchema };
