import 'express-async-errors';
import express from 'express';
import 'reflect-metadata';

import { PORT } from './utils/config';
import { connectToDatabase } from './utils/db';

const app = express();

app.use(express.json());

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

void start();
