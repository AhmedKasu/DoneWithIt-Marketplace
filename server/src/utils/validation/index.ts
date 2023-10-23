import { ZodError, ZodSchema } from 'zod';
import { ValidationError } from '../errors';

type SafeParseReturnType<T> = {
  success: boolean;
  data?: T;
  error?: ZodError;
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const validateUserInput = <T>(
  schema: ZodSchema<T>,
  userInput: unknown,
  customErrorMessage?: string
): T => {
  const { error, data }: SafeParseReturnType<T> = schema.safeParse(userInput);

  if (error) {
    const firstZodError = `${error.issues[0].path.join('.')}: ${
      error.issues[0].message
    }`;

    throw new ValidationError(customErrorMessage || firstZodError);
  }

  return data!;
};

export default validateUserInput;
