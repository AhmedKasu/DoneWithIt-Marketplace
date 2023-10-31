class ValidationError extends Error {
  status: number;
  details?: object;

  constructor(message: string | object) {
    if (typeof message === 'string') {
      super(message);
    } else {
      super();
    }

    this.name = 'ValidationError';
    this.status = 400;

    if (typeof message === 'object') this.details = message;
  }
}

class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}
class UnauthorizedError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}
class ForbiddenError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}

export { NotFoundError, ValidationError, UnauthorizedError, ForbiddenError };
