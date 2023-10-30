import { useFormContext } from 'react-hook-form';
import { GridProps, TextFieldProps } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface Props {
  name: string;
  label: string;
  otherProps?: TextFieldProps;
  gridProps?: GridProps;
}

export default function TextInput({
  name,
  label,
  gridProps,
  otherProps,
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
        {...register(name)}
        label={label}
        helperText={error?.message as string}
        {...otherProps}
      />
    </Grid>
  );
}
