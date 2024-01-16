import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import APIClient from '../../services/apiClient';
import { useAuthContext } from '../../context/authContext';
import { CustomAxiosError } from '../../types';

interface SignupData {
  email: string;
  password: string;
}

interface ResData {
  id: number;
  name: string;
}

const apiClient = new APIClient<SignupData, ResData>('/login');

const useSignin = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();
  return useMutation<ResData, CustomAxiosError, SignupData>({
    mutationFn: apiClient.post,
    onSuccess: (result) => {
      setCurrentUser(result);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    },
  });
};

export default useSignin;
