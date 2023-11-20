import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar';

import { useAuthContext } from '../context/authContext';
import useGetCurrentUser from '../hooks/useGetCurrentUser';

export default function Layout() {
  const { currentUser } = useAuthContext();
  const { refetch } = useGetCurrentUser();

  useEffect(() => {
    if (currentUser !== null) refetch();
  }, [currentUser, refetch]);

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
