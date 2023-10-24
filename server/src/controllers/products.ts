import Router, { Request, Response } from 'express';
import _ from 'lodash';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';

import validateUserInput from '../utils/validation';
import { productSchema, paramsIdSchema } from '../utils/validation/schemas';

import findById from '../middleware/findById';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const allProducts = await Product.findAll({
    attributes: { exclude: ['categoryId'] },
    include: { model: Category, attributes: ['name'] },
  });
  res.status(200).json(allProducts);
});

router.post('/', async (req: Request, res: Response) => {
  const newProduct = await Product.create({
    ...validateUserInput(productSchema, req.body),
    userId: req.entities?.user?.id,
  });
  res.status(200).json(_.omit(newProduct.toJSON(), ['createdAt', 'updatedAt']));
});

router.get(
  '/:id',
  findById(Product, 'product', paramsIdSchema, (_req) => {
    return {
      attributes: { exclude: ['categoryId', 'userId'] },
      include: [
        { model: User, as: 'seller', attributes: ['id', 'name'] },
        { model: Category, attributes: ['name'] },
      ],
    };
  }),
  (req: Request, res: Response) => {
    res.status(200).json(req.entities?.product);
  }
);

export default router;
