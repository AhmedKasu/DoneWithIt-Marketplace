import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import APIClient from '../../services/apiClient';

import { CustomAxiosError } from '../../types';
interface SignupData {
  name: string;
  email: string;
  password: string;
}

type ResData = Omit<SignupData, 'password'>;

const apiClient = new APIClient<SignupData>('/users');

const useSignup = () => {
  const navigate = useNavigate();
  return useMutation<ResData, CustomAxiosError, SignupData>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    },
  });
};

export default useSignup;
