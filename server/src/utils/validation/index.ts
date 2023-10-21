import { ZodError, ZodSchema } from 'zod';
import { ValidationError } from '../errors';

type SafeParseReturnType<T> = {
  success: boolean;
  data?: T;
  error?: ZodError;
};

const validateUserInput = <T>(
  schema: ZodSchema<T>,
  userInput: unknown,
  customErrorMessage?: string
): T => {
  const { error, data }: SafeParseReturnType<T> = schema.safeParse(userInput);

  if (error) {
    const zodErrorMessage = error.issues
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');

    throw new ValidationError(customErrorMessage || zodErrorMessage);
  }

  return data!;
};

export default validateUserInput;
