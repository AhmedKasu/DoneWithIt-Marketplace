import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar/NavBar';

import { useAuthContext } from '../context/authContext';
import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';

export default function Layout() {
  const { currentUser } = useAuthContext();
  useRefetchCurrentUser();

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
