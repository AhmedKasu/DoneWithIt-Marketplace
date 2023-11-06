import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Product, CustomAxiosError } from '../types';

const productsURL = 'http://localhost:3001/api/products';

const useGetProducts = (categoryId?: number) => {
  return useQuery<Product[], CustomAxiosError>({
    queryKey: ['products', categoryId],
    queryFn: () =>
      axios
        .get(productsURL, {
          params: {
            categoryId,
          },
        })
        .then((res) => res.data),
  });
};

export default useGetProducts;
