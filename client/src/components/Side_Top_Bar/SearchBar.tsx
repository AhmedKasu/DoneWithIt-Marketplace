import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import TextInput from '../Forms/TextInput';
import Form from '../Forms';

import { searchQuerySchema } from '../../utils/validation/product';

type FormData = z.infer<typeof searchQuerySchema>;
interface Props {
  onSubmit: (variables: FieldValues) => void;
}

export default function SearchBar({ onSubmit }: Props) {
  const methods = useForm<FormData>({
    defaultValues: {
      search: '',
    },
    resolver: zodResolver(searchQuerySchema),
    mode: 'onSubmit',
  });

  const { isDirty } = methods.formState;

  const handleSubmit = (variables: FieldValues) => {
    onSubmit(variables);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit}>
        <TextInput
          name='search'
          label='Search Marketplace'
          showHelperText={false}
          otherProps={{
            id: 'search-bar',
            autoComplete: 'off',
            variant: 'filled',
            size: 'small',
            InputProps: {
              sx: { height: '40px', borderRadius: 20, pb: 2 },
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              inputProps: {
                maxLength: 40,
              },
            },

            InputLabelProps: {
              shrink: false,
              sx: {
                display: isDirty ? 'none' : 'block',
                ml: 4,
                position: 'absolute',
                top: '-10%',
              },
            },
            sx: {
              width: '95%',

              '& .MuiFilledInput-underline:before': {
                borderBottom: 'none',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottom: 'none',
              },
              '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
            },
          }}
        />
      </Form>
    </FormProvider>
  );
}
