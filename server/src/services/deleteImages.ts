import { DeleteApiResponse } from 'cloudinary';
import cloudinary from '../utils/cloudinary';

import { getImagePublicId } from '../helpers/cloudinaryHelpers';

const deleteImages = async (imageUrls: string[]) => {
  await Promise.all(
    imageUrls.map(async (url) => {
      const publicId = getImagePublicId(url);

      if (!publicId) return;
      return (await cloudinary.uploader.destroy(publicId)) as DeleteApiResponse;
    })
  );
};

export default deleteImages;
