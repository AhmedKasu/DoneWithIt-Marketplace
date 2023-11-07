import z from 'zod';
const searchQuerySchema = z.object({
  search: z
    .string()
    .max(30, 'Search term is too long')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Search term contains invalid characters')
    .optional(),
});

export { searchQuerySchema };
