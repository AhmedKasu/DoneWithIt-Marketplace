import { useQuery } from '@tanstack/react-query';

import APIClient from '../services/apiClient';
import { CustomAxiosError, Categories } from '../types';

const apiClient = new APIClient<Categories>('/categories');

const useGetCategories = () => {
  return useQuery<Categories[], CustomAxiosError>({
    queryKey: ['categories'],
    queryFn: apiClient.getAll,
  });
};

export default useGetCategories;
