import { z } from 'zod';

const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required.')
    .min(2, 'First name must be at least 2 characters long.')
    .max(20, 'First name must be at most 20 characters long.'),
  lastName: z
    .string()
    .min(1, 'Last name is required.')
    .min(2, 'Last name must be at least 2 characters long.')
    .max(20, 'Last name must be at most 20 characters long.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password),
      'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    ),
});

export default signupSchema;
