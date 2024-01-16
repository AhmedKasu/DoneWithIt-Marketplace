import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { baseURL } from '../../services/apiClient';
import useUploadImages from './useUploadImages';
import { CustomAxiosError } from '../../types';
import { FormData as NewProduct } from '../../components/Product/ProductForm';
interface ResData extends NewProduct {
  userId: number;
  status: 'available' | 'pending' | 'sold';
}

const useCreateListing = () => {
  const navigate = useNavigate();
  const uploadImages = useUploadImages();
  return useMutation<ResData, CustomAxiosError, NewProduct>({
    mutationFn: async (newProduct) => {
      const imageDataUrls = newProduct.imageUrls;
      const uploadedImageUrls = await uploadImages(imageDataUrls);

      const productWithUploadedImages = {
        ...newProduct,
        imageUrls: uploadedImageUrls,
      };

      const response = await axios.post(
        `${baseURL}/products`,
        productWithUploadedImages,
        { withCredentials: true }
      );

      return response.data;
    },

    onSuccess: () => {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
  });
};

export default useCreateListing;
