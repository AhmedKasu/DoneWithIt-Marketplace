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

export { NotFoundError, ValidationError };
