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

export const productsQueryOptions = (req: Request) => {
  const statusQuery = req.query.status && req.query;
  const searchQuery = req.query.search;
  const conditionQuery = req.query.condition && req.query;
  const categoryQuery = req.query.categoryId && req.query;
  const minPriceQuery = req.query.minPrice;
  const maxPriceQuery = req.query.maxPrice;

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

  if (categoryQuery) {
    const categorySchema = productSchema.pick({ categoryId: true });
    where.categoryId = validateUserInput(categorySchema, {
      ...categoryQuery,
      categoryId: Number(categoryQuery.categoryId),
    }).categoryId;
  }

  const minPrice = validateUserInput(priceQuerySchema, minPriceQuery) as string;
  const maxPrice = validateUserInput(priceQuerySchema, maxPriceQuery) as string;

  if (minPriceQuery && !maxPriceQuery) {
    where.price = {
      [Op.gte]: minPrice,
    };
  }

  if (!minPriceQuery && maxPriceQuery) {
    where.price = {
      [Op.lte]: maxPrice,
    };
  }

  if (minPriceQuery && maxPriceQuery) {
    where.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }

  return {
    attributes: { exclude: ['categoryId'] },
    include: { model: Category, attributes: ['name'] },
    where,
  };
};
