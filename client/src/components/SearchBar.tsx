import { FormProvider, useForm } from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import TextInput from './forms/TextInput';
import Form from './forms';

export default function SearchBar() {
  const methods = useForm({
    defaultValues: {
      search: '',
    },
  });

  const { isDirty } = methods.formState;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={(values) => console.log('submiting', values)}>
        <TextInput
          name='search'
          label='Search Marketplace'
          otherProps={{
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
