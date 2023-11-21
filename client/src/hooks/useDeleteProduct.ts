import { useMutation, useQueryClient } from '@tanstack/react-query';

import APIClient from '../services/apiClient';

import { User, CustomAxiosError } from '../types';
const apiClient = new APIClient<void, void>('/products');

interface Params {
  userId: number;
  productId: number;
}

interface updateProductContext {
  previousUser: User;
}

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<void, CustomAxiosError, Params, updateProductContext>({
    onMutate: ({ userId, productId }) => {
      const previousUser = queryClient.getQueryData<User>(['user', userId]);
      const previousProduct = previousUser?.products.find(
        (product) => product.id === productId
      );

      if (!previousUser || !previousProduct) return;

      const previousProducts = previousUser?.products ?? [];

      const updatedProducts = previousProducts.filter(
        (product) => product.id !== productId
      );

      const updatedUserCache = {
        ...previousUser,
        products: updatedProducts,
      };

      queryClient.setQueryData<User>(['user', userId], updatedUserCache);
      return { previousUser };
    },
    mutationFn: ({ productId }: Params) => apiClient.delete(`${productId}`),
    onError: (_err, _product, context) => {
      if (!context) return;
      queryClient.setQueryData<User>(
        ['user', context.previousUser.id],
        context.previousUser
      );
    },
  });
};

export default useDeleteProduct;
