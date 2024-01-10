import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import APIClient from '../services/apiClient';
import { FormData as UpdatedProduct } from '../pages/CreateListing';

import { CustomAxiosError } from '../types';

interface Params {
  productId: number;
  updatedProduct: UpdatedProduct;
}

interface ResData extends UpdatedProduct {
  userId: number;
  status: 'available' | 'pending' | 'sold';
}

const apiClient = new APIClient<UpdatedProduct, ResData>('/products');

const useEditListing = () => {
  const navigate = useNavigate();
  return useMutation<ResData, CustomAxiosError, Params>({
    mutationFn: ({ productId, updatedProduct }) =>
      apiClient.put(`/${productId}`, updatedProduct),
    onSuccess: () => {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
  });
};

export default useEditListing;
