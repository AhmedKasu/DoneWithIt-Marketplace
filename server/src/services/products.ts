import { Request } from 'express';
import { Product } from '../types';
import { WhereOptions } from 'sequelize';

import { Category } from '../models/Category';

import validateUserInput from '../utils/validation';
import { productStatusSchema } from '../utils/validation/schemas';

export const productsQueryOptions = (req: Request) => {
  const statusQuery = req.query.status && req.query;

  const where: WhereOptions<Product> = {};
  if (statusQuery)
    where.status = validateUserInput(productStatusSchema, statusQuery).status;

  return {
    attributes: { exclude: ['categoryId'] },
    include: { model: Category, attributes: ['name'] },
    where,
  };
};
