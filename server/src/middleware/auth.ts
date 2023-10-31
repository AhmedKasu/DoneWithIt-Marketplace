import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../utils/config';
import { ValidationError, UnauthorizedError } from '../utils/errors';

interface JWTPayload extends JwtPayload {
  id: number;
  name: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken)
    throw new UnauthorizedError('Access denied. accessToken not provided.');

  try {
    const { id, name } = verify(accessToken, JWT_SECRET) as JWTPayload;
    req.entities = req.entities || {};
    req.authUser = { id, name };
  } catch (err) {
    res.clearCookie('accessToken');
    throw new ValidationError('Invalid accessToken.');
  }

  return next();
};

export default auth;
