import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { baseURL } from '../services/apiClient';
import { CustomAxiosError } from '../types';
import { FormData as NewProduct } from '../pages/CreateListing';

interface ResData extends NewProduct {
  userId: number;
  status: 'available' | 'pending' | 'sold';
}

const cloudinaryUploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const cloudinaryPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

const useCreateListing = () => {
  const navigate = useNavigate();
  return useMutation<ResData, CustomAxiosError, NewProduct>({
    mutationFn: async (newProduct) => {
      const imageDataUrls = newProduct.imageUrls;
      const uploadedImageUrls = await Promise.all(
        imageDataUrls.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', cloudinaryPreset);

          const { data } = await axios({
            method: 'post',
            url: cloudinaryUploadUrl,
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
