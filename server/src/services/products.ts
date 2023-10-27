import { Request } from 'express';
import { Product } from '../types';
import { WhereOptions, Op } from 'sequelize';

import { Category } from '../models/Category';

import validateUserInput from '../utils/validation';
import {
  productStatusSchema,
  searchQuerySchema,
} from '../utils/validation/schemas';

export const productsQueryOptions = (req: Request) => {
  const statusQuery = req.query.status && req.query;
  const searchQuery = req.query.search;

  const where: WhereOptions<Product> = {};
  if (statusQuery)
    where.status = validateUserInput(productStatusSchema, statusQuery).status;

  if (searchQuery) {
    const validatedSearchQuery = validateUserInput(
      searchQuerySchema,
      searchQuery
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where[Op.or as any] = [
      { title: { [Op.iLike]: `%${validatedSearchQuery}%` } },
      { description: { [Op.iLike]: `%${validatedSearchQuery}%` } },
    ];
  }

  return {
    attributes: { exclude: ['categoryId'] },
    include: { model: Category, attributes: ['name'] },
    where,
  };
};
