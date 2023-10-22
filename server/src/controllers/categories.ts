import Router from 'express';
const router = Router();

import { Category } from '../models/Category';

router.get('/', async (_req, res) => {
  const categories = await Category.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  res.status(200).json(categories);
});

export default router;
