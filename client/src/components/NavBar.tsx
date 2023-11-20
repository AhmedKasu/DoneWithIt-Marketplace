import { useNavigate, Link as RouterLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { Toolbar } from '@mui/material';

import UserProfileIcon from './UserProfileIcon';
import useSignout from '../hooks/useSignOut';

import { useScreenBreakingPoints } from '../context/screenBreakpoints';
interface Props {
  currentUser: string | undefined;
}

function NavBar({ currentUser }: Props) {
  const navigate = useNavigate();
  const { isExtraSmallScreen } = useScreenBreakingPoints();
  const { mutate: signout } = useSignout();

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
                sx={{ display: { md: 'flex', color: 'red' }, mr: 1 }}
              />
            </RouterLink>
          </Tooltip>
          {!isExtraSmallScreen && (
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
          currentUser={currentUser}
          handleSigninClick={() => navigate('/signin')}
          handleSignoutClick={() => signout()}
          handleSignupClick={() => navigate('/signup')}
        />
      </Container>
    </AppBar>
  );
}
export default NavBar;
