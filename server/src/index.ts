import 'express-async-errors';
import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';

import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';

import errorHandler from './middleware/errorHandler';
import auth from './middleware/auth';

import usersRouter from './controllers/users';
import loginRouter from './controllers/login';
import categoriesRouter from './controllers/categories';
import productsRouter from './controllers/products';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(auth);

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
