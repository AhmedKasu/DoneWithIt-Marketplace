import Router, { Request, Response } from 'express';
import { Op } from 'sequelize';

import { ChatRoom } from '../models/ChatRoom';
import { User } from '../models/User';
import { Message } from '../models/Message';
import { Product } from '../models/Product';

import auth from '../middleware/auth';
import findById from '../middleware/findById';

import { paramsStringIdSchema } from '../utils/validation/schemas';

const router = Router();

router.get('/user/:id', auth, async (_req, res) => {
  const userId = _req.params.id;
  const chatRooms = await ChatRoom.findAll({
    where: {
      [Op.or]: [{ buyerId: userId }, { sellerId: userId }],
    },
    attributes: ['id'],
    include: [
      { model: Message, as: 'lastReadMessage', attributes: ['id'] },
      {
        model: Message,
        as: 'messages',
        include: [{ model: User, as: 'sender', attributes: ['id', 'name'] }],
      },
      { model: User, as: 'buyer', attributes: ['id', 'name'] },
      { model: User, as: 'seller', attributes: ['id', 'name'] },
      { model: Product, attributes: ['id', 'title'] },
    ],
  });
  res.status(200).json(chatRooms);
});

router.get(
  '/:id',
  auth,
  findById(ChatRoom, 'chatRoom', paramsStringIdSchema, (_req) => {
    return {
      attributes: ['id'],
      include: [
        { model: Message, as: 'lastReadMessage' },
        {
          model: Message,
          as: 'messages',
          include: [{ model: User, as: 'sender', attributes: ['id', 'name'] }],
        },
        { model: User, as: 'buyer', attributes: ['id', 'name'] },
        { model: User, as: 'seller', attributes: ['id', 'name'] },
        { model: Product },
      ],
    };
  }),
  (req: Request, res: Response) => {
    res.status(200).json(req.entities?.chatRoom);
  }
);

export default router;
