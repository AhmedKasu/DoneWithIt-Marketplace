import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { NODE_ENV } from './config';
import { CLIENT_URL } from '../constants';

let io: Server;

const setUpSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  if (NODE_ENV === 'production') return;

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

export { setUpSocket, io };
