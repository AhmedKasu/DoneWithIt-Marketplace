import { z } from 'zod';

const signinSchema = z.object({
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

export default signinSchema;
