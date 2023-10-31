import { Outlet } from 'react-router';
import Container from '@mui/material/Container';

import NavBar from '../components/NavBar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Container sx={{ pt: 5 }}>
        <Outlet />
      </Container>
    </>
  );
}
