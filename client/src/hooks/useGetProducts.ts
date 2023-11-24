import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Product, CustomAxiosError } from '../types';

const productsURL = 'http://localhost:3001/api/products';

const useGetProducts = (
  categoryId?: number,
  search?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  categoryId = categoryId === 0 ? undefined : categoryId;
  //console.log(minPrice, maxPrice);
  return useQuery<Product[], CustomAxiosError>({
    queryKey: ['products', categoryId, search, minPrice, maxPrice],
    queryFn: () =>
      axios
        .get(productsURL, {
          params: {
            categoryId,
            search,
            minPrice,
            maxPrice,
          },
        })
        .then((res) => res.data),
  });
};

export default useGetProducts;
