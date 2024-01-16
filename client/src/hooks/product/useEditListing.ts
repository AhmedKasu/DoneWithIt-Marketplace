import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import APIClient from '../../services/apiClient';
import useUploadImages from './useUploadImages';

import { FormData as UpdatedProduct } from '../../components/Product/ProductForm';
import { CustomAxiosError } from '../../types';

interface Params {
  productId: number;
  initialImageUrls: string[];
  updatedProduct: UpdatedProduct;
}

interface ResData extends UpdatedProduct {
  userId: number;
  status: 'available' | 'pending' | 'sold';
}

const apiClient = new APIClient<UpdatedProduct, ResData>('/products');

const useEditListing = () => {
  const navigate = useNavigate();
  const uploadImages = useUploadImages();
  return useMutation<ResData, CustomAxiosError, Params>({
    mutationFn: async ({ productId, initialImageUrls, updatedProduct }) => {
      const newImageUrls = updatedProduct.imageUrls.filter(
        (url) => !initialImageUrls.includes(url)
      );

      const deletedImageUrls = initialImageUrls.filter(
        (url) => !updatedProduct.imageUrls.includes(url)
      );

      let finalImageUrls: string[] = [...initialImageUrls];

      let uploadedImages: string[] = [];
      if (newImageUrls.length > 0) {
        uploadedImages = await uploadImages(newImageUrls);
      }

      finalImageUrls = finalImageUrls
        .filter((url) => !deletedImageUrls.includes(url))
        .concat(uploadedImages);

      return apiClient.put(`/${productId}`, {
        ...updatedProduct,
        imageUrls: finalImageUrls,
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
  });
};

export default useEditListing;
