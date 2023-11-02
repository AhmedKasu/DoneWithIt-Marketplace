import { Outlet } from 'react-router';
import Box from '@mui/material/Box';

import NavBar from '../components/NavBar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          mt: 2,
          backgroundColor: '#eceff1',
          position: 'fixed',
          width: '100%',
        }}>
        <Outlet />
      </Box>
    </>
  );
}
