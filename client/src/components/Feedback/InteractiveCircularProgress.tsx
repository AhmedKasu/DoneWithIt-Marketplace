import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  success: boolean;
}

export default function InteractiveCircularProgress({ success }: Props) {
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box id='circular-progress' sx={{ m: 1, mt: 10, position: 'relative' }}>
      <Fab aria-label='save' color='primary' sx={buttonSx}>
        {success ? <CheckIcon /> : <SaveIcon />}
      </Fab>

      <CircularProgress
        size={68}
        sx={{
          color: green[500],
          position: 'absolute',
          top: -6,
          left: -6,
          zIndex: 1,
        }}
      />
    </Box>
  );
}
