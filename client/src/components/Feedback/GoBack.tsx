import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  previousPage?: string;
  currentPage?: string;
}

export default function GoBack({ currentPage, previousPage }: Props) {
  const navigate = useNavigate();
  return (
    <Stack direction='row'>
      <Box
        sx={{
          ml: 3,
          mt: 1,
          height: '36px',
          width: '36px',
          borderRadius: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
          '&:hover': {
            cursor: 'pointer',
            boxShadow: 1,
            backgroundColor: '#f7f7f7',
          },
        }}>
        <Tooltip title='Go back'>
          <KeyboardBackspaceIcon
            onClick={() => navigate(-1)}
            sx={{ color: 'gray' }}
          />
        </Tooltip>
      </Box>
      {previousPage && currentPage && (
        <Stack direction='column' sx={{ ml: 2, mb: 1 }}>
          <Typography sx={{ fontSize: '.8rem', color: 'gray' }}>
            {previousPage}
          </Typography>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 900,
              fontFamily: 'inherit',
            }}
            variant='h6'>
            {currentPage}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
