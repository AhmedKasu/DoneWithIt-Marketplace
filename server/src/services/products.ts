import { Request } from 'express';
import { Product } from '../types';
import { WhereOptions, Op } from 'sequelize';

import { Category } from '../models/Category';

import {
  handleStatus,
  handleSearch,
  handleCondition,
  handleCategory,
  handlePriceRange,
} from '../helpers/productsHelpers';

import validateUserInput from '../utils/validation';
import { priceQuerySchema } from '../utils/validation/schemas';

export const productsQueryOptions = (req: Request) => {
  const where: WhereOptions<Product> = {};

  const status = handleStatus(req.query);
  const search = handleSearch(req.query);
  const condition = handleCondition(req.query);
  const categoryId = handleCategory(req.query);

  if (status) where.status = status;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (search) where[Op.or as any] = search[Op.or];
  if (condition) where.condition = condition;
  if (categoryId) where.categoryId = categoryId;

  const priceConditions = handlePriceRange(
    validateUserInput(priceQuerySchema, req.query.minPrice) as string,
    validateUserInput(priceQuerySchema, req.query.maxPrice) as string
  );

  if (priceConditions) {
    where.price = priceConditions;
  }

  return {
    attributes: { exclude: ['categoryId'] },
    include: { model: Category, attributes: ['name'] },
    where,
  };
};
