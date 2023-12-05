import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Product, CustomAxiosError } from '../types';
import { baseURL } from '../services/apiClient';

const productsURL = `${baseURL}/products`;

const useGetProducts = (
  categoryId?: number,
  search?: string,
  minPrice?: number,
  maxPrice?: number,
  condition?: Product['condition'],
  status?: Product['status']
) => {
  categoryId = categoryId === 0 ? undefined : categoryId;

  return useQuery<Product[], CustomAxiosError>({
    queryKey: [
      'products',
      categoryId,
      search,
      minPrice,
      maxPrice,
      condition,
      status,
    ],
    queryFn: () =>
      axios
        .get(productsURL, {
          params: {
            categoryId,
            search,
            minPrice,
            maxPrice,
            condition,
            status,
          },
        })
        .then((res) => res.data),
  });
};

export default useGetProducts;
