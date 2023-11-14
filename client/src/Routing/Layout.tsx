import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar';

import { useAuthContext } from '../context/authContext';

export default function Layout() {
  const { currentUser } = useAuthContext();

  return (
    <>
      <NavBar currentUser={currentUser as string} />
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
