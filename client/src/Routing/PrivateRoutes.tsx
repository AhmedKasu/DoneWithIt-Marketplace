import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';
import { useAuthContext } from '../context/authContext';

import NavBar from '../components/NavBar/NavBar';

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
      <NavBar currentUser={currentUser?.name} />
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
