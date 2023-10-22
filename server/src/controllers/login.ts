import Router from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { User } from '../models/User';
import validateUserInput from '../utils/validation';
import { loginSchema } from '../utils/validation/schemas';
import { JWT_SECRET, NODE_ENV } from '../utils/config';

const router = Router();

router.post('/', async (req, res) => {
  const { name, password } = validateUserInput(loginSchema, req.body);

  const user = await User.findOne({ where: { name } });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await compare(password, user.passwordHash);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const accessToken = sign({ name, id: user.id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return res
    .status(200)
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    })
    .json({ message: 'Logged in successfully.' });
});

export default router;
