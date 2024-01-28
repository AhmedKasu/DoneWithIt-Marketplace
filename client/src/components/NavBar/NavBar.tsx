import { useNavigate, Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { Toolbar } from '@mui/material';

import UserProfileIcon from './UserProfileIcon';
import useSignout from '../../hooks/auth/useSignOut';
import useResetFilters from '../../hooks/product/useResetFilters';

import { useFiltersContext } from '../../context/FiltersContext';
import { useAuthContext } from '../../context/authContext';

function NavBar() {
  const navigate = useNavigate();
  const { mutate: signout } = useSignout();
  const resetFilters = useResetFilters();

  const { setCategoryId } = useFiltersContext();
  const { currentUser } = useAuthContext();

  const handleAppLogoClick = () => {
    resetFilters();
    setCategoryId(undefined);
  };

  return (
    <AppBar elevation={1} sx={{ backgroundColor: 'appBg.navbar' }}>
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
                onClick={handleAppLogoClick}
                sx={{ display: { md: 'flex', color: 'red' }, mr: 1 }}
              />
            </RouterLink>
          </Tooltip>

          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: { xs: '.9rem', sm: '1rem', md: '1.2rem', lg: '1.3rem' },
              letterSpacing: { md: '.1rem', lg: '.2rem' },
              color: 'red',
              textDecoration: 'none',
            }}>
            DoneWithIt
          </Typography>
        </Toolbar>

        <UserProfileIcon
          currentUser={currentUser?.name}
          handleSigninClick={() => navigate('/signin')}
          handleSignoutClick={() => signout()}
          handleSignupClick={() => navigate('/signup')}
        />
      </Container>
    </AppBar>
  );
}
export default NavBar;
