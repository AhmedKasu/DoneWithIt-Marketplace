import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { CLIENT_URL } from '../constants';

const setUpSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export { setUpSocket };
