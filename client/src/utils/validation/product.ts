import z from 'zod';
const searchQuerySchema = z.object({
  search: z
    .string()
    .max(30, 'Search term is too long')
    .regex(
      /^(?:[a-zA-Z0-9\s\-_]+)?$/,
      'Search term contains invalid characters'
    )
    .optional(),
});

const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Title should have at least 3 characters.')
    .max(50, 'Title should not exceed 50 characters.'),
  price: z
    .number({ invalid_type_error: 'Price is required' })
    .min(1, 'Price must be greater than 0')
    .max(30000, 'Price cannot exceed 30,000'),
  categoryId: z.number().int().positive(),
  condition: z.enum(['New', 'Used - Like New', 'Used - Good', 'Used - Fair']),
  description: z
    .string()
    .min(10, 'Description is too short! Should be at least 10 characters.')
    .max(200, 'Description is too long! Should not exceed 200 characters.'),
  imageUrls: z
    .array(z.string().url('Invalid image URL.'))
    .min(1, 'Please provide at least one image.')
    .max(4, 'You can provide a maximum of 4 images.'),
});

export { searchQuerySchema, productSchema };
