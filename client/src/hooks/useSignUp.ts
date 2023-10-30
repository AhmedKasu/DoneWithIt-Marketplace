import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import APIClient from '../services/apiClient';

import { ErrorResponse } from '../types';
interface SignupData {
  name: string;
  email: string;
  password: string;
}

type ResData = Omit<SignupData, 'password'>;

const apiClient = new APIClient<SignupData>('/users');

const useSignup = () => {
  return useMutation<ResData, AxiosError<ErrorResponse>, SignupData>({
    mutationFn: apiClient.post,
  });
};

export default useSignup;
