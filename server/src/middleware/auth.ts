import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../utils/config';

interface JWTPayload extends JwtPayload {
  id: string;
  name: string;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken)
    return res.status(401).send('Access denied. accessToken not provided.');

  try {
    const { id, name } = verify(accessToken, JWT_SECRET) as JWTPayload;
    req.user = { id, name };
  } catch (err) {
    res.clearCookie('accessToken');
    return res.status(400).send('Invalid accessToken.');
  }

  return next();
};

export default auth;
