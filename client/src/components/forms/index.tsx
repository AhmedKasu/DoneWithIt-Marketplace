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
  return (
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {children}
      </Grid>
    </Box>
  );
}
