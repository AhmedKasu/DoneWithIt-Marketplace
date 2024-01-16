import { useQuery } from '@tanstack/react-query';

import { Product, CustomAxiosError } from '../../types';

import APIClient from '../../services/apiClient';

const apiClient = new APIClient<ResData>('/products');

interface ResData extends Product {
  priceHistories: [{ price: number; createdAt: string }];
  seller: {
    id: number;
    name: string;
    createdAt: string;
  };
}

const useGetProduct = (productId?: string) => {
  return useQuery<ResData, CustomAxiosError>({
    queryKey: ['products', productId],
    queryFn: () => apiClient.getOne(productId as string),
  });
};

export default useGetProduct;
