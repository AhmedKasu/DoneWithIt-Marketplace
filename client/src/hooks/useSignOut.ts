import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import APIClient from '../services/apiClient';
import { useAuthContext } from '../context/authContext';

import { CustomAxiosError } from '../types';

const apiClient = new APIClient<void>('/logout');

const useSignout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthContext();
  return useMutation<void, CustomAxiosError>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      setCurrentUser(undefined);
      setTimeout(() => {
        navigate('/');
      }, 300);
    },
  });
};

export default useSignout;
