import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ModelStatic, Model, FindOptions } from 'sequelize/types';

import validateUserInput from '../utils/validation/index';
import {
  EntityKeys,
  ReqUserInstance,
  ProductInstance,
  CategoryInstance,
} from '../types/express';

const findById = <T extends Model>(
  Model: ModelStatic<T>,
  resource: EntityKeys,
  validationSchema: ZodSchema<string>,
  optionsFn?: (req: Request) => FindOptions
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = validateUserInput(validationSchema, req.params.id);
    const options = optionsFn ? optionsFn(req) : undefined;

    const modelInstance = await Model.findByPk(id, options);

    req.entities = req.entities || {};
    req.entities[resource] = modelInstance as
      | ProductInstance
      | CategoryInstance
      | ReqUserInstance
      | null;

    if (!req.entities[resource])
      return res.status(404).send(`${resource} not found!`);

    return next();
  };
};

export default findById;
