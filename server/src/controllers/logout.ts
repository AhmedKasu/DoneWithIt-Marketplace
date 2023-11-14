import Router from 'express';

import auth from '../middleware/auth';

const router = Router();

router.post('/', auth, (_req, res) => {
  res.clearCookie('accessToken').status(204).end();
});
export default router;
