import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';
import { useAuthContext } from '../context/authContext';

import NavBar from '../components/NavBar/NavBar';

export default function PrivateRoutes() {
  useRefetchCurrentUser();
  const { currentUser } = useAuthContext();

  if (currentUser === null) return <Navigate to='/signin' />;

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
