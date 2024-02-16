import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { CORS_ORIGIN } from '../constants';
import { Message as MessageType, InitChat } from '../types';

import { ChatRoom } from '../models/ChatRoom';
import { Message } from '../models/Message';

interface ExistingChatEvent {
  chatRoomId: string;
  receiverId: number;
  lastReadMessageId: number;
}

const setUpSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: CORS_ORIGIN,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    const userRoom = `seller_${userId}`;
    void socket.join(userRoom);

    socket.on(
      'init_chat',
      async ({ buyerId, sellerId, productId }: InitChat) => {
        const chatRoomId = `${sellerId}-${buyerId}-${productId}`;

        const existingChat = await ChatRoom.findOne({
          where: { id: chatRoomId },
        });

        if (!existingChat) {
          await ChatRoom.create({
            id: chatRoomId,
            buyerId,
            sellerId,
            productId,
          });
        }

        const sellerRoom = `seller_${sellerId}`;
        socket.to(sellerRoom).emit('new_chat', { chatRoomId });

        void socket.join(chatRoomId);
      }
    );

    socket.on(
      'existing_chat',
      async ({
        chatRoomId,
        receiverId,
        lastReadMessageId,
      }: ExistingChatEvent) => {
        const chatRoom = await ChatRoom.findOne({ where: { id: chatRoomId } });
        if (!chatRoom) return;

        chatRoom.lastReadMessageId = lastReadMessageId;
        await chatRoom.save();

        const sellerRoom = `seller_${receiverId}`;
        socket.to(sellerRoom).emit('new_chat', { chatRoomId });
      }
    );

    socket.on('join_chat', ({ chatRoomId }: { chatRoomId: string }) => {
      void socket.join(chatRoomId);
    });

    socket.on(
      'send_message',
      async ({ content, chatRoomId: roomId, senderId }: MessageType) => {
        await Message.create({
          chatRoomId: roomId,
          senderId,
          content,
        });
        socket.to(roomId).emit('receive_message', {
          chatRoomId: roomId,
          senderId,
          content,
        });
      }
    );
  });
};

export { setUpSocket };
