import { FieldValues } from 'react-hook-form';

import ProductForm, { FormData } from '../components/Product/ProductForm';

import useGetCategories from '../hooks/useGetCategories';
import useCreateListing from '../hooks/product/useCreateListing';

export default function CreateListing() {
  const { data: categories } = useGetCategories();
  const {
    mutate: uploadImage,
    isSuccess,
    isPending,
    error,
  } = useCreateListing();

  const handleSubmit = (variables: FieldValues) => {
    uploadImage(variables as FormData);
  };

  const errorMessage = error?.response?.data.details;

  return (
    <>
      {categories && (
        <ProductForm
          categories={categories}
          handleSubmit={handleSubmit}
          isPending={isPending}
          isSuccess={isSuccess}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}
