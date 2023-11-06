import { useQuery } from '@tanstack/react-query';

import APIClient from '../services/apiClient';
import { CustomAxiosError, Category } from '../types';

const apiClient = new APIClient<Category>('/categories');

const useGetCategories = () => {
  return useQuery<Category[], CustomAxiosError>({
    queryKey: ['categories'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // One day
  });
};

export default useGetCategories;
