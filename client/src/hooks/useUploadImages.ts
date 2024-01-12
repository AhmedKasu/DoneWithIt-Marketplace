import axios from 'axios';

import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
} from '../utils/config';

const useUploadImages = () => {
  const uploadImage = async (imageUrls: string[]) => {
    return await Promise.all(
      imageUrls.map(async (file, i) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('public_id', `${i}-${Date.now()}`);

        const { data } = await axios({
          method: 'post',
          url: CLOUDINARY_UPLOAD_URL,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        return data.secure_url;
      })
    );
  };

  return uploadImage;
};

export default useUploadImages;
