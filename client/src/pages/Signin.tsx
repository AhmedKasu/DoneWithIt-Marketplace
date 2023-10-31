import * as React from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Form from '../components/forms';
import TextInput from '../components/forms/TextInput';

import signinSchema from '../utils/validation/signin';

type FormData = z.infer<typeof signinSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const methods = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(signinSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (variables: FieldValues) => {
    console.log('variables', variables);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit}>
            <TextInput
              label='Email Address'
              name='email'
              otherProps={{
                autoComplete: 'email',
                required: true,
                fullWidth: true,
              }}
            />
            <TextInput
              name='password'
              label='Password'
              otherProps={{
                autoComplete: 'current-password',
                required: true,
                fullWidth: true,
                type: showPassword ? 'text' : 'password',
                InputProps: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
            </Grid>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/signup' variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Form>
        </FormProvider>
      </Box>
    </Container>
  );
}
