import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

import APIClient from '../services/apiClient';
import { ErrorResponse } from '../types';

interface SignupData {
  email: string;
  password: string;
}

interface ResData {
  message: string;
}

const apiClient = new APIClient<SignupData, ResData>('/login');

const useSignin = () => {
  const navigate = useNavigate();
  return useMutation<ResData, AxiosError<ErrorResponse>, SignupData>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      setTimeout(() => {
        navigate('/');
      }, 300);
    },
  });
};

export default useSignin;
