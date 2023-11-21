import { useQuery } from '@tanstack/react-query';

import APIClient from '../services/apiClient';
import { CustomAxiosError, User } from '../types';

const apiClient = new APIClient<User>('/users');

const useGetUser = (userId: number) => {
  return useQuery<User, CustomAxiosError>({
    queryKey: ['user', userId],
    queryFn: () => apiClient.getOne(`/${userId}`),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useGetUser;
