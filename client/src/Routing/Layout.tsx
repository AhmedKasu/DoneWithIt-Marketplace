import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar/NavBar';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';

export default function Layout() {
  useRefetchCurrentUser();

  return (
    <>
      <NavBar />
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
