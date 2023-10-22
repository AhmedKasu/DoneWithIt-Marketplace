import 'express-async-errors';
import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';

import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';

import errorHandler from './middleware/errorHandler';

import usersRouter from './controllers/users';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
