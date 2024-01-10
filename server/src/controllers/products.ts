import { Router, Request, Response } from 'express';
import _ from 'lodash';
import { DeleteApiResponse } from 'cloudinary';

import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { PriceHistory } from '../models/PriceHistory';

import cloudinary from '../utils/cloudinary';
import validateUserInput from '../utils/validation';
import {
  productSchema,
  paramsIdSchema,
  productStatusSchema,
} from '../utils/validation/schemas';
import { productsQueryOptions } from '../services/products';
import { getImagePublicId } from '../helpers/cloudinaryHelpers';

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

    product.set({
      ...validateUserInput(productSchema, req.body),
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

    await Promise.all(
      product.imageUrls.map(async (url) => {
        const publicId = getImagePublicId(url);

        if (!publicId) return;
        return (await cloudinary.uploader.destroy(
          publicId
        )) as DeleteApiResponse;
      })
    );
    await (req.entities?.product as Product).destroy();

    return res.status(204).end();
  }
);

router.use('/:id', singleProductRouter);

export default router;
