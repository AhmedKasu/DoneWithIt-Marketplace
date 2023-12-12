import * as React from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Form from '../components/Forms';
import TextInput from '../components/Forms/TextInput';

import Error from '../components/Feedback/Error';
import Success from '../components/Feedback/Success';

import signupSchema from '../utils/validation/signup';
import useSignup from '../hooks/useSignup';

type FormData = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const methods = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(signupSchema),
  });

  const { mutate, error, data } = useSignup();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = ({
    firstName,
    lastName,
    email,
    password,
  }: FieldValues) => {
    mutate({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });
  };

  const errorMessage = error?.response?.data.details as string;
  return (
    <Container component='main' maxWidth='xs' sx={{ pt: 15, height: '100vh' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Error open={!!errorMessage} message={errorMessage} />
        <Success
          open={!!data}
          message={`User ${data?.name} created successfully!`}
        />

        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ mb: 3 }}>
          Sign up
        </Typography>

        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit}>
            <TextInput
              gridProps={{ sm: 6 }}
              name='firstName'
              label='First Name'
              otherProps={{
                id: 'firstName',
                autoComplete: 'given-name',
                required: true,
                fullWidth: true,
              }}
            />
            <TextInput
              gridProps={{ sm: 6 }}
              label='Last Name'
              name='lastName'
              otherProps={{
                id: 'lastName',
                autoComplete: 'family-name',
                required: true,
                fullWidth: true,
              }}
            />
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
                autoComplete: 'new-password',
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
                Sign Up
              </Button>
            </Grid>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </FormProvider>
      </Box>
    </Container>
  );
}
