import { useNavigate, Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RecyclingIcon from '@mui/icons-material/Recycling';

import UserProfileIcon from './UserProfileIcon';
import { Toolbar } from '@mui/material';

function NavBar() {
  const navigate = useNavigate();
  return (
    <AppBar sx={{ backgroundColor: 'white' }}>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Toolbar>
          <RecyclingIcon
            sx={{ display: { xs: 'none', md: 'flex', color: 'red' }, mr: 1 }}
          />
          <Tooltip title='Go home'>
            <Typography
              variant='h6'
              noWrap
              component={RouterLink}
              to='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'red',
                textDecoration: 'none',
              }}>
              DoneWithIt
            </Typography>
          </Tooltip>
        </Toolbar>

        <UserProfileIcon
          currentUser={'John Doe'}
          handleSigninClick={() => navigate('/signin')}
          handleSignoutClick={() => navigate('/')}
          handleSignupClick={() => navigate('/signup')}
        />
      </Container>
    </AppBar>
  );
}
export default NavBar;
