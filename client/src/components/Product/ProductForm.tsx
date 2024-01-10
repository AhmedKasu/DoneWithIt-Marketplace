import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import Form from '../Forms';
import TextInput from '../Forms/TextInput';
import ImagePicker from '../Forms/ImagePicker';

import Error from '../Feedback/Error';
import Success from '../Feedback/Success';
import InteractiveCircularProgress from '../Feedback/InteractiveCircularProgress';

import { productSchema } from '../../utils/validation/product';
import { productConditions } from '../../utils/constants';
import { Category, Product } from '../../types';

export type FormData = z.infer<typeof productSchema>;

type ListingToEdit = Omit<Product, 'category' | 'userId' | 'id'> & {
  categoryId: number;
};

interface Props {
  categories: Category[];
  handleSubmit: (variables: FieldValues) => void;
  isSuccess: boolean;
  isPending: boolean;
  errorMessage: string | undefined;
  listingToEdit?: ListingToEdit;
}

export default function ProductForm({
  categories,
  errorMessage,
  handleSubmit,
  isPending,
  isSuccess,
  listingToEdit,
}: Props) {
  const defaultCondition = listingToEdit?.condition || productConditions[0];
  const defaultCategoryId = listingToEdit?.categoryId || categories[0].id;

  const methods = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      categoryId: defaultCategoryId,
      condition: defaultCondition,
    },
    resolver: zodResolver(productSchema),
  });
  const { formState } = methods;

  const renderFormContent = () => {
    if (isPending) return <InteractiveCircularProgress success={isSuccess} />;

    if (isSuccess) {
      const action = listingToEdit ? 'updated' : 'created';
      return (
        <Success message={`Listing successfully ${action}`} open={isSuccess} />
      );
    }

    return (
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit}>
          <ImagePicker
            name='imageUrls'
            editPreviews={listingToEdit?.imageUrls}
          />
          <TextInput
            name='title'
            label='Title'
            otherProps={{
              id: 'title',
              autoComplete: 'title',
              required: true,
              fullWidth: true,
              defaultValue: listingToEdit?.title,
            }}
          />
          <TextInput
            name='price'
            label='Price'
            type='number'
            otherProps={{
              id: 'price',
              autoComplete: 'price',
              required: true,
              fullWidth: true,
              defaultValue: listingToEdit?.price,
              InputProps: {
                startAdornment: formState.dirtyFields.price && (
                  <InputAdornment position='start'>€</InputAdornment>
                ),
              },
            }}
          />
          {categories && categories.length > 0 && (
            <TextInput
              name='categoryId'
              label='Category'
              otherProps={{
                id: 'category',
                autoComplete: 'category',
                required: true,
                fullWidth: true,
                select: true,
                defaultValue: defaultCategoryId,
              }}>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextInput>
          )}
          <TextInput
            name='condition'
            label='Condition'
            otherProps={{
              id: 'condition',
              autoComplete: 'condition',
              required: true,
              fullWidth: true,
              select: true,
              defaultValue: defaultCondition,
            }}>
            {productConditions.map((condition, index) => (
              <MenuItem key={index} value={condition}>
                {condition}
              </MenuItem>
            ))}
          </TextInput>
          <TextInput
            name='description'
            label='Description'
            otherProps={{
              id: 'description',
              autoComplete: 'description',
              required: true,
              fullWidth: true,
              multiline: true,
              rows: 4,
              defaultValue: listingToEdit?.description,
            }}
          />
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 2, mb: 2 }}>
              {listingToEdit ? 'Update' : 'Create'} Listing
            </Button>
          </Grid>
        </Form>
      </FormProvider>
    );
  };

  return (
    <Box sx={{ height: '100vh', overflowY: 'scroll' }}>
      <Container component='main' maxWidth='xs' sx={{ pt: { xs: 8, sm: 15 } }}>
        <Box
          sx={{
            marginTop: { xs: 0, sm: 8 },
            pb: { xs: 10 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Error message={errorMessage as string} open={!!errorMessage} />

          <Typography
            component='h1'
            variant='h5'
            sx={{ mb: 3, fontWeight: 800 }}>
            {listingToEdit ? 'Edit Listing' : 'Item For Sale'}
          </Typography>

          {renderFormContent()}
        </Box>
      </Container>
    </Box>
  );
}
