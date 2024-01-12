import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import ProductForm from '../components/Product/ProductForm';

import useGetCategories from '../hooks/useGetCategories';
import useGetProduct from '../hooks/useGetProduct';
import useEditListing from '../hooks/useEditListing';

import { Product } from '../types';
import { FormData } from '../components/Product/ProductForm';

const feedbackStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'appBg.main',
  height: '100vh',
};

export default function CreateListing() {
  const { data: categories } = useGetCategories();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: productLoading } = useGetProduct(id);
  const {
    mutate: updateListing,
    isSuccess,
    isPending,
    error,
  } = useEditListing();

  const handleSubmit = (variables: FieldValues) => {
    if (!id || !product) return;
    updateListing({
      productId: +id,
      initialImageUrls: product.imageUrls,
      updatedProduct: variables as FormData,
    });
  };

  const errorMessage = error?.response?.data.details;

  if (productLoading)
    return (
      <Box
        sx={{
          feedbackStyles,
        }}>
        <CircularProgress />
      </Box>
    );

  if (!product)
    return (
      <Box sx={feedbackStyles}>
        The product with the given id was not found!
      </Box>
    );

  const { imageUrls, title, price, status, category, condition, description } =
    product as Product;

  const categoryId = categories?.filter((c) => c.name === category.name)[0]
    ?.id as number;

  const listingToEdit = {
    imageUrls,
    title,
    price,
    status,
    categoryId,
    condition,
    description,
  };

  return (
    <>
      {categories && (
        <ProductForm
          categories={categories}
          handleSubmit={handleSubmit}
          isPending={isPending}
          isSuccess={isSuccess}
          errorMessage={errorMessage}
          listingToEdit={listingToEdit}
        />
      )}
    </>
  );
}
