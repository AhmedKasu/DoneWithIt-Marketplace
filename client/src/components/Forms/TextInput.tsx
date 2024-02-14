import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { GridProps, TextFieldProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'password';
  showHelperText?: boolean;
  otherProps?: TextFieldProps;
  gridProps?: GridProps;
  children?: ReactNode;
  hiddenLabel?: boolean;
}

export default function TextInput({
  name,
  label,
  hiddenLabel = false,
  type = 'text',
  gridProps,
  otherProps,
  showHelperText = true,
  children,
}: Props) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const error = errors[name];

  return (
    <Grid item xs={12} {...gridProps}>
      <TextField
        error={!!error}
        {...register(name, { valueAsNumber: type === 'number' ? true : false })}
        label={hiddenLabel ? undefined : label}
        hiddenLabel={hiddenLabel}
        type={type}
        helperText={showHelperText ? (error?.message as string) : undefined}
        {...otherProps}>
        {children}
      </TextField>
    </Grid>
  );
}
