import { AxiosError } from 'axios';
export interface ErrorResponse {
  name: string;
  details: string;
}

export type CustomAxiosError = AxiosError<ErrorResponse>;
