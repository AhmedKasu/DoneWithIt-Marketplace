import { Router, Request, Response } from 'express';
import _ from 'lodash';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { PriceHistory } from '../models/PriceHistory';

import validateUserInput from '../utils/validation';
import {
  productSchema,
  paramsIdSchema,
  productStatusSchema,
} from '../utils/validation/schemas';
import { productsQueryOptions } from '../services/products';
import deleteImages from '../services/deleteImages';

import findById from '../middleware/findById';
import checkOwner from '../middleware/checkOwner';
import auth from '../middleware/auth';

import { Product as ProductType } from '../types';

const router = Router();
const singleProductRouter = Router({ mergeParams: true });

router.get('/', async (req: Request, res: Response) => {
  const allProducts = await Product.findAll({
    ...productsQueryOptions(req),
    include: [{ model: PriceHistory, attributes: ['price', 'createdAt'] }],
  });
  res.status(200).json(allProducts);
});

router.use(auth);

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
        { model: User, as: 'seller', attributes: ['id', 'name', 'createdAt'] },
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

    const editedProduct = validateUserInput(productSchema, req.body);

    const deletedImages = product.imageUrls.filter(
      (url) => !editedProduct.imageUrls.includes(url)
    );

    if (deleteImages) await deleteImages(deletedImages);

    product.set({
      ...editedProduct,
      userId: req.authUser!.id,
    });

    await product.save();

    return res.status(200).json(product);
  }
);

singleProductRouter.put(
  '/status',
  findById(Product, 'product', paramsIdSchema),
  checkOwner('product'),
  async (req: Request, res: Response) => {
    (req.entities!.product! as Product).status = validateUserInput(
      productStatusSchema,
      req.body
    ).status;

    await (req.entities!.product! as Product).save();
    res.status(200).json(req.entities!.product);
  }
);

singleProductRouter.delete(
  '/',
  findById(Product, 'product', paramsIdSchema),
  checkOwner('product'),
  async (req: Request, res: Response) => {
    const product = req.entities!.product as ProductType;

    await deleteImages(product.imageUrls);

    await (req.entities?.product as Product).destroy();

    return res.status(204).end();
  }
);

router.use('/:id', singleProductRouter);

export default router;
