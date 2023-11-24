import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { FieldValues, useFormContext } from 'react-hook-form';

interface Props {
  children: React.ReactNode;
  onSubmit: (variables: FieldValues) => Promise<void> | void;
}

export default function Form({ children, onSubmit }: Props) {
  const { handleSubmit } = useFormContext();

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  return (
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleOnKeyDown}>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );
}
