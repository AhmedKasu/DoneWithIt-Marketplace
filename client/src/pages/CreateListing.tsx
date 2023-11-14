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

import Form from '../components/forms';
import TextInput from '../components/forms/TextInput';
import ImagePicker from '../components/forms/ImagePicker';

import Error from '../components/Error';
import Success from '../components/Success';

import { productSchema } from '../utils/validation/product';
import { Product } from '../types';
import useGetCategories from '../hooks/useGetCategories';

type FormData = z.infer<typeof productSchema>;

const productConditions: Array<Product['condition']> = [
  'Used - Good',
  'Used - Fair',
  'Used - Like New',
  'New',
];

export default function CreateListing() {
  const { data: categories, error } = useGetCategories();

  const methods = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      categoryId: 1,
      condition: productConditions[0],
    },
    resolver: zodResolver(productSchema),
  });
  const { dirtyFields } = methods.formState;

  const handleSubmit = (variables: FieldValues) => {
    console.log('variabless', variables);
  };

  const errorMessage = error?.response?.data.details as string;
  const data = undefined;
  return (
    <Container component='main' maxWidth='xs' sx={{ pt: 15, height: '100vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Error message={errorMessage} open={!!error} />
        <Success message='Successfully logged in!' open={!!data} />

        <Typography component='h1' variant='h5' sx={{ mb: 3, fontWeight: 800 }}>
          Item For Sale
        </Typography>

        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit}>
            <ImagePicker name='imageUrls' />
            <TextInput
              name='title'
              label='Title'
              otherProps={{
                autoComplete: 'title',
                required: true,
                fullWidth: true,
              }}
            />
            <TextInput
              name='price'
              label='Price'
              type='number'
              otherProps={{
                autoComplete: 'price',
                required: true,
                fullWidth: true,
                type: 'number',

                InputProps: {
                  startAdornment: dirtyFields.price && (
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
                  autoComplete: 'category',
                  required: true,
                  fullWidth: true,
                  select: true,
                  defaultValue: categories[0].id,
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
                autoComplete: 'condition',
                required: true,
                fullWidth: true,
                select: true,
                defaultValue: productConditions[0],
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
                autoComplete: 'description',
                required: true,
                fullWidth: true,
                multiline: true,
                rows: 4,
              }}
            />
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Create Listing
              </Button>
            </Grid>
          </Form>
        </FormProvider>
      </Box>
    </Container>
  );
}
