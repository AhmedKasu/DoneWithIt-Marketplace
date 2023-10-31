import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Product as ProductType, User as UserType } from '../types';
import { ForbiddenError } from '../utils/errors';

type EntityKeys = 'product' | 'user';
type ResourceUser = Omit<UserType, 'passwordHash'>;

const checkOwner = (resourceKey: EntityKeys) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!['PUT', 'DELETE', 'PATCH'].includes(req.method)) return next();

    const resource = req.entities?.[resourceKey];
    if (!resource) {
      return res.status(500).json({
        name: 'ServerError',
        details: `${resourceKey} not found in request.`,
      });
    }

    const notProductOwner =
      resource instanceof Product &&
      req.authUser?.id !== (resource as ProductType).userId;
    const notUserOwner =
      resource instanceof User &&
      req.authUser?.id !== (resource as ResourceUser).id;

    if (notProductOwner || notUserOwner) {
      throw new ForbiddenError('Operation not authorized.');
    }

    next();
  };
};

export default checkOwner;
