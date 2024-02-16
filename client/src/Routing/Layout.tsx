import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import OutsideRouter from './OutsideRouter';

import useRefetchCurrentUser from '../hooks/user/useRefetchCurrentUser';

export default function Layout() {
  useRefetchCurrentUser();

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
