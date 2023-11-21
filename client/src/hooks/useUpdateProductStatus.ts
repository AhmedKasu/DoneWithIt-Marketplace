import { useMutation, useQueryClient } from '@tanstack/react-query';

import APIClient from '../services/apiClient';
import { Product, User, CustomAxiosError } from '../types';

const apiClient = new APIClient<{ status: Product['status'] }, Product>(
  '/products'
);

interface Params {
  userId: number;
  productId: number;
  status: Product['status'];
}

interface updateProductContext {
  previousUser: User;
}

const useUpdateProductstatus = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, CustomAxiosError, Params, updateProductContext>({
    onMutate: ({ userId, productId, status }) => {
      const previousUser = queryClient.getQueryData<User>(['user', userId]);
      const previousProduct = previousUser?.products.find(
        (product) => product.id === productId
      );

      if (!previousUser || !previousProduct) return;

      const updatedProduct = { ...previousProduct, status };
      const previousProducts = previousUser?.products ?? [];

      const updatedProducts = previousProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      const updatedUserCache = {
        ...previousUser,
        products: updatedProducts,
      };

      queryClient.setQueryData<User>(['user', userId], updatedUserCache);
      return { previousUser };
    },
    mutationFn: ({ productId, status }) =>
      apiClient.put(`${productId}/status`, { status }),
    onError: (_err, _product, context) => {
      if (!context) return;
      queryClient.setQueryData<User>(
        ['user', context.previousUser.id],
        context.previousUser
      );
    },
  });
};

export default useUpdateProductstatus;
