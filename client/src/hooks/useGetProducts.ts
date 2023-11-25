import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Product, CustomAxiosError } from '../types';

const productsURL = 'http://localhost:3001/api/products';

const useGetProducts = (
  categoryId?: number,
  search?: string,
  minPrice?: number,
  maxPrice?: number,
  condition?: Product['condition']
) => {
  categoryId = categoryId === 0 ? undefined : categoryId;

  return useQuery<Product[], CustomAxiosError>({
    queryKey: ['products', categoryId, search, minPrice, maxPrice, condition],
    queryFn: () =>
      axios
        .get(productsURL, {
          params: {
            categoryId,
            search,
            minPrice,
            maxPrice,
            condition,
          },
        })
        .then((res) => res.data),
  });
};

export default useGetProducts;
