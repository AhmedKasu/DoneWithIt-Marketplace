import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function HomeButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant='contained'
      sx={{ mt: 2 }}
      onClick={() => navigate('/')}
      color='primary'>
      Go back to the homepage
    </Button>
  );
}

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Box
      component='div'
      id='error-page'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'appBg.main',
      }}>
      <Box sx={{ pt: '15%' }}>
        {isRouteErrorResponse(error) ? (
          <Stack
            direction='column'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <img
              alt='Not found'
              src='https://static.xx.fbcdn.net/rsrc.php/y_/r/Krj1JsX3uTI.svg'
              height={120}
            />
            <Typography variant='h1'>404!</Typography>
            <Typography>
              <i>We are sorry, the page you requested couldn't be found.</i>
            </Typography>
            <HomeButton />
          </Stack>
        ) : (
          <Stack
            direction='column'
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Typography variant='h1'>500!</Typography>
            <Typography>
              {' '}
              Sorry, an unexpected server error has occurred.
            </Typography>
            <HomeButton />
          </Stack>
        )}
      </Box>
    </Box>
  );
}
