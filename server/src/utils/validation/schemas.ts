import { z } from 'zod';

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

export { userSchema };
