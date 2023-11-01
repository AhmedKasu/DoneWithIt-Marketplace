import 'express-async-errors';
import express, { Request } from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT, NODE_ENV } from './utils/config';
import { connectToDatabase } from './utils/db';

import errorHandler from './middleware/errorHandler';

import usersRouter from './controllers/users';
import loginRouter from './controllers/login';
import categoriesRouter from './controllers/categories';
import productsRouter from './controllers/products';

const app = express();

app.use(
  cors<Request>({
    origin:
      NODE_ENV === 'development'
        ? 'http://localhost:5173'
        : 'https://patientor.herokuapp.com',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
