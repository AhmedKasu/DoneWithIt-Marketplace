import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { baseURL } from '../services/apiClient';
import { CustomAxiosError } from '../types';
import { FormData as NewProduct } from '../pages/CreateListing';

import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
} from '../utils/config';

interface ResData extends NewProduct {
  userId: number;
  status: 'available' | 'pending' | 'sold';
}

const useCreateListing = () => {
  const navigate = useNavigate();
  return useMutation<ResData, CustomAxiosError, NewProduct>({
    mutationFn: async (newProduct) => {
      const imageDataUrls = newProduct.imageUrls;
      const uploadedImageUrls = await Promise.all(
        imageDataUrls.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

          const { data } = await axios({
            method: 'post',
            url: CLOUDINARY_UPLOAD_URL,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          return data.secure_url;
        })
      );

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
