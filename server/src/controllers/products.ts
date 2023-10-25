import Router, { Request, Response } from 'express';
import _ from 'lodash';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { PriceHistory } from '../models/PriceHistory';

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
    userId: req.authUser?.id,
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
        { model: PriceHistory, attributes: ['price', 'createdAt'] },
      ],
    };
  }),
  (req: Request, res: Response) => {
    res.status(200).json(req.entities?.product);
  }
);

router.put(
  '/:id',
  findById(Product, 'product', paramsIdSchema),
  async (req: Request, res: Response) => {
    const product = req.entities?.product as Product;

    if (req.authUser?.id !== product.userId)
      return res.status(403).send('Operation not authorized.');

    product.set({
      ...validateUserInput(productSchema, req.body),
      userId: req.authUser?.id,
    });
    await product.save();

    return res.status(200).json(product);
  }
);

router.delete(
  '/:id',
  findById(Product, 'product', paramsIdSchema),
  async (req: Request, res: Response) => {
    const product = req.entities?.product as Product;

    if (req.authUser?.id !== product.userId)
      return res.status(403).send('Operation not authorized.');

    await product.destroy();
    return res.status(204).end();
  }
);

export default router;
