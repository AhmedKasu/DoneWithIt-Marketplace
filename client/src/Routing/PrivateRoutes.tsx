import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import useGetCurrentUser from '../hooks/useGetCurrentUser';
import { useAuthContext } from '../context/authContext';

import NavBar from '../components/NavBar/NavBar';

export default function PrivateRoutes() {
  const { refetch } = useGetCurrentUser();
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser !== null) refetch();
  }, [currentUser, refetch]);

  if (currentUser === null) return <Navigate to='/signin' />;

  if (currentUser === undefined) return <div>Loading...</div>;
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
