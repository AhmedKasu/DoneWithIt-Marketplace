import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import OutsideRouter from './OutsideRouter';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';
import { useAuthContext } from '../context/authContext';

export default function PrivateRoutes() {
  useRefetchCurrentUser();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  return (
    <>
      <OutsideRouter />
      <Box
        sx={{
          mt: 2,
          backgroundColor: 'appBg.main',
          position: 'fixed',
          width: '100%',
        }}>
        <Outlet />
      </Box>
    </>
  );
}
