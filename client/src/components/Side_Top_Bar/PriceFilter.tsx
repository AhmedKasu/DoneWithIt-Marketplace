import { useEffect } from 'react';
import { FormProvider, useForm, FieldValues } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import TextInput from '../forms/TextInput';
import Form from '../forms';

interface FormData {
  min: number;
  max: number;
}

interface Props {
  onFilterPrice: (variables: FieldValues) => void;
}

export default function PriceFilter({ onFilterPrice }: Props) {
  const methods = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      min: undefined,
      max: undefined,
    },
  });

  const {
    formState: { dirtyFields },
    setValue,
    watch,
  } = methods;
  const [watchedMin, watchedMax] = watch(['min', 'max']);

  useEffect(() => {
    const maxPrice = 30000;
    const min = watchedMin > maxPrice ? maxPrice : watchedMin;
    const max = watchedMax > maxPrice ? maxPrice : watchedMax;

    setValue('min', min, { shouldValidate: true });
    setValue('max', max, { shouldValidate: true });
  }, [watchedMin, watchedMax, setValue]);

  const handleSubmit = (variables: FieldValues) => {
    onFilterPrice(variables);
  };

  return (
    <>
      <Typography
        sx={{
          mb: 1,
          alignSelf: 'center',
          fontSize: '.9rem',
          color: 'black',
          fontFamily: 'inherit',
          fontWeight: 'bold',
        }}
        variant='h6'>
        Price
      </Typography>

      <Box sx={{ ml: 2, mt: 2 }}>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <TextInput
                gridProps={{ md: 5.5 }}
                name='min'
                label='Min'
                type='number'
                otherProps={{
                  autoComplete: 'min',
                  size: 'small',
                  InputProps: {
                    startAdornment: dirtyFields.min && (
                      <InputAdornment position='start'>€</InputAdornment>
                    ),
                  },
                }}
              />

              <TextInput
                gridProps={{ md: 5.5 }}
                name='max'
                label='Max'
                type='number'
                otherProps={{
                  autoComplete: 'max',
                  size: 'small',
                  InputProps: {
                    startAdornment: dirtyFields.max && (
                      <InputAdornment position='start'>€</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Form>
        </FormProvider>
      </Box>
    </>
  );
}
