import Router, { Request, Response } from 'express';

import { Product } from '../models/Product';
import { Category } from '../models/Category';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const allProducts = await Product.findAll({
    attributes: { exclude: ['categoryId'] },
    include: { model: Category, attributes: ['name'] },
  });
  res.status(200).json(allProducts);
});

export default router;
