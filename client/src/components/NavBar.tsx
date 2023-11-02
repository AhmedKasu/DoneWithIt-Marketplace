import { useNavigate, Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RecyclingIcon from '@mui/icons-material/Recycling';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import UserProfileIcon from './UserProfileIcon';
import { Toolbar } from '@mui/material';

function NavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar elevation={1} sx={{ backgroundColor: 'white' }}>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Toolbar>
          <Tooltip title='Go home'>
            <RouterLink to='/'>
              <RecyclingIcon
                sx={{ display: { md: 'flex', color: 'red' }, mr: 1 }}
              />
            </RouterLink>
          </Tooltip>
          {!isSmallScreen && (
            <Typography
              variant='h6'
              noWrap
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: { md: '.2rem', lg: '.3rem' },
                color: 'red',
                textDecoration: 'none',
              }}>
              DoneWithIt
            </Typography>
          )}
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
