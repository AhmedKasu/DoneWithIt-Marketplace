import { useQuery } from '@tanstack/react-query';

import APIClient from '../services/apiClient';
import { Product, CustomAxiosError } from '../types';

const apiClient = new APIClient<Product>('/products');

const useGetProducts = () => {
  return useQuery<Product[], CustomAxiosError>({
    queryKey: ['products'],
    queryFn: apiClient.getAll,
  });
};

export default useGetProducts;
