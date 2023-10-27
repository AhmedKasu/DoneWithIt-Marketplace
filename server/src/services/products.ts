import { Request } from 'express';
import { Product } from '../types';
import { WhereOptions, Op } from 'sequelize';

import { Category } from '../models/Category';

import validateUserInput from '../utils/validation';
import {
  productSchema,
  productStatusSchema,
  searchQuerySchema,
} from '../utils/validation/schemas';

export const productsQueryOptions = (req: Request) => {
  const statusQuery = req.query.status && req.query;
  const searchQuery = req.query.search;
  const conditionQuery = req.query.condition && req.query;

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

  if (conditionQuery) {
    const conditionSchema = productSchema.pick({ condition: true });
    where.condition = validateUserInput(
      conditionSchema,
      conditionQuery
    ).condition;
  }

  return {
    attributes: { exclude: ['categoryId'] },
    include: { model: Category, attributes: ['name'] },
    where,
  };
};
