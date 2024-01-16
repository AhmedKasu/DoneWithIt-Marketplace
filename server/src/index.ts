import 'express-async-errors';
import express, { Request } from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';

import { PORT, NODE_ENV } from './utils/config';
import { CLIENT_URL } from './constants';
import { connectToDatabase } from './utils/db';
import { setUpSocket } from './utils/socket';

import errorHandler from './middleware/errorHandler';

import usersRouter from './controllers/users';
import loginRouter from './controllers/login';
import logoutRouter from './controllers/logout';
import categoriesRouter from './controllers/categories';
import productsRouter from './controllers/products';
import path from 'path';

const app = express();
const server = http.createServer(app);

app.use(
  cors<Request>({
    origin:
      NODE_ENV === 'development'
        ? CLIENT_URL
        : 'https://patientor.herokuapp.com',
    credentials: true,
  })
);

setUpSocket(server);

const root = path.join(__dirname, '../public');

app.use(express.static(root));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

app.get('*', (_req, res) => {
  res.sendFile(root + '/index.html');
});

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
