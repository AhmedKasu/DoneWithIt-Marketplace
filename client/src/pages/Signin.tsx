import { useState, useEffect } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink, Navigate } from 'react-router-dom';
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

import Form from '../components/Forms';
import TextInput from '../components/Forms/TextInput';

import Error from '../components/Feedback/Error';
import Success from '../components/Feedback/Success';

import signinSchema from '../utils/validation/signin';

import useSignin from '../hooks/auth/useSignIn';
import { useAuthContext } from '../context/authContext';

type FormData = z.infer<typeof signinSchema>;

export default function SignIn() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const methods = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(signinSchema),
  });

  const { mutate: signin, error, data } = useSignin();

  const { currentUser } = useAuthContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = ({ email, password }: FieldValues) => {
    signin({ email, password });
  };

  const errorMessage = error?.response?.data.details as string;

  useEffect(() => {
    if (currentUser) {
      const timeoutId = setTimeout(() => {
        setShouldNavigate(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [currentUser]);

  if (shouldNavigate) return <Navigate to='/' />;

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

        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ mb: 3 }}>
          Sign in
        </Typography>

        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit}>
            <TextInput
              label='Email Address'
              name='email'
              otherProps={{
                id: 'email',
                autoComplete: 'email',
                required: true,
                fullWidth: true,
              }}
            />
            <TextInput
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              otherProps={{
                id: 'password',
                autoComplete: 'current-password',
                required: true,
                fullWidth: true,
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
