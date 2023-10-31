import { Request, Response, NextFunction } from 'express';
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
  DatabaseError,
} from 'sequelize';
import {
  ValidationError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errors';

interface CustomError extends Error {
  details?: string;
  status: number;
}

const errorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { name, message, details, status } = error;
  if (error instanceof UniqueConstraintError) {
    return res.status(400).json({
      error: name,
      details: error.errors[0].message,
    });
  }

  if (
    error instanceof SequelizeValidationError ||
    error instanceof DatabaseError
  ) {
    return res.status(400).json({
      error: name,
      details: message,
    });
  }

  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError
  ) {
    return res.status(status).json({
      error: name,
      details: message || details,
    });
  }

  return res.status(500).json({
    error: 'Unknown error',
    details: message,
  });
};

export default errorHandler;
