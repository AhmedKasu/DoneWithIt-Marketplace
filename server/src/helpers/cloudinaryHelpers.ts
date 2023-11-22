const getImagePublicId = (url: string): string | null => {
  const urlParts = url.split('/');
  const filename = urlParts[urlParts.length - 1];
  const folder = urlParts[urlParts.length - 2];
  const publicId = folder + '/' + filename.split('.')[0];
  return publicId;
};

export { getImagePublicId };
