import Router from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../models/User';
import validateUserInput from '../utils/validation';
import { loginSchema } from '../utils/validation/schemas';
import { JWT_SECRET, NODE_ENV } from '../utils/config';
import { ValidationError } from '../utils/errors';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = validateUserInput(loginSchema, req.body);

  const user = await User.findOne({ where: { email } });
  if (!user) throw new ValidationError('Invalid email or password.');

  const { name, id, passwordHash } = user;
  const validPassword = await compare(password, passwordHash);
  if (!validPassword) throw new ValidationError('Invalid email or password.');

  const accessToken = sign({ name, id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return res
    .status(200)
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    })
    .json({ id, name });
});

export default router;
