import Router, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { PriceHistory } from '../models/PriceHistory';

import validateUserInput from '../utils/validation';
import { userSchema, paramsIdSchema } from '../utils/validation/schemas';

import auth from '../middleware/auth';
import findById from '../middleware/findById';

import { ValidationError } from '../utils/errors';

import { User as UserType } from '../types';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, password } = validateUserInput(userSchema, req.body);

  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new ValidationError(
      'An account with the given email already exists. Try logging in instead.'
    );
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    passwordHash,
  } as UserType);

  res
    .status(200)
    .json(_.omit(newUser.toJSON(), ['passwordHash', 'createdAt', 'updatedAt']));
});

router.get('/me', auth, (req: Request, res: Response) => {
  res.status(200).json(req.authUser);
});

router.get(
  '/:id',
  auth,
  findById(User, 'user', paramsIdSchema, (_req) => {
    return {
      attributes: { exclude: ['passwordHash'] },
      include: [
        {
          model: Product,
          attributes: { exclude: ['categoryId', 'userId'] },
          include: [
            { model: Category, attributes: ['name'] },
            { model: PriceHistory, attributes: ['price', 'createdAt'] },
          ],
        },
      ],
    };
  }),
  (req: Request, res: Response) => {
    res.status(200).json(req.entities?.user);
  }
);

export default router;
