import { Request } from 'express';
import { Product } from '../types';
import { WhereOptions, Op } from 'sequelize';

import { Category } from '../models/Category';

import validateUserInput from '../utils/validation';
import {
  priceQuerySchema,
  productSchema,
  productStatusSchema,
  searchQuerySchema,
} from '../utils/validation/schemas';

const handleStatus = (query: { status?: Product['status'] }) => {
  if (query.status) {
    return validateUserInput(productStatusSchema, query).status;
  }
  return undefined;
};

const handleSearch = (query: { search?: string }) => {
  if (query.search) {
    const validatedSearchQuery = validateUserInput(
      searchQuerySchema,
      query.search
    );
    return {
      [Op.or]: [
        { title: { [Op.iLike]: `%${validatedSearchQuery}%` } },
        { description: { [Op.iLike]: `%${validatedSearchQuery}%` } },
      ],
    };
  }
  return undefined;
};

const handleCondition = (query: { condition?: Product['condition'] }) => {
  if (query.condition) {
    const conditionSchema = productSchema.pick({ condition: true });
    return validateUserInput(conditionSchema, query).condition;
  }
  return undefined;
};

const handleCategory = (query: { categoryId?: string }) => {
  if (query.categoryId) {
    const categorySchema = productSchema.pick({ categoryId: true });
    return validateUserInput(categorySchema, {
      ...query,
      categoryId: Number(query.categoryId),
    }).categoryId;
  }
  return undefined;
};

const handlePriceRange = (min: string, max: string) => {
  if (min && !max) {
    return { [Op.gte]: min };
  }
  if (!min && max) {
    return { [Op.lte]: max };
  }
  if (min && max) {
    return { [Op.between]: [min, max] };
  }
  return undefined;
};

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
