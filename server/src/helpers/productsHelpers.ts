import { Op } from 'sequelize';

import { Product } from '../types';
import validateUserInput from '../utils/validation';
import {
  productStatusSchema,
  searchQuerySchema,
  productSchema,
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

export {
  handleStatus,
  handleSearch,
  handleCondition,
  handleCategory,
  handlePriceRange,
};
