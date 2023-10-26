import { Router, Request, Response } from 'express';
import _ from 'lodash';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { PriceHistory } from '../models/PriceHistory';

import validateUserInput from '../utils/validation';
import { productSchema, paramsIdSchema } from '../utils/validation/schemas';

import findById from '../middleware/findById';
import checkOwner from '../middleware/checkOwner';

import { Product as ProductType } from '../types';

const router = Router();
const singleProductRouter = Router({ mergeParams: true });

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
    userId: req.authUser!.id,
  } as ProductType);
  res.status(200).json(_.omit(newProduct.toJSON(), ['createdAt', 'updatedAt']));
});

singleProductRouter.get(
  '/',
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
    res.status(200).json(req.entities!.product);
  }
);

singleProductRouter.put(
  '/',
  findById(Product, 'product', paramsIdSchema),
  checkOwner('product'),
  async (req: Request, res: Response) => {
    const product = req.entities?.product as Product;

    product.set({
      ...validateUserInput(productSchema, req.body),
      userId: req.authUser!.id,
    });
    await product.save();

    return res.status(200).json(product);
  }
);

singleProductRouter.delete(
  '/',
  findById(Product, 'product', paramsIdSchema),
  checkOwner('product'),
  async (req: Request, res: Response) => {
    const product = req.entities!.product as Product;

    await product.destroy();
    return res.status(204).end();
  }
);

router.use('/:id', singleProductRouter);

export default router;
