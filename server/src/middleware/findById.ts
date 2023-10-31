import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ModelStatic, Model, FindOptions } from 'sequelize/types';

import validateUserInput from '../utils/validation/index';
import { EntitiyTypes, EntityKeys } from '../types/express';
import { NotFoundError } from '../utils/errors';

const findById = <T extends Model, U>(
  Model: ModelStatic<T>,
  resource: EntityKeys,
  validationSchema: ZodSchema<U>,
  optionsFn?: (req: Request) => FindOptions
) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const id = validateUserInput(validationSchema, req.params.id) as string;
    const options = optionsFn ? optionsFn(req) : undefined;

    const modelInstance = await Model.findByPk(id, options);

    req.entities = req.entities || {};
    req.entities[resource] = modelInstance as EntitiyTypes;

    if (!req.entities[resource])
      throw new NotFoundError(`${resource} not found!`);

    return next();
  };
};

export default findById;
