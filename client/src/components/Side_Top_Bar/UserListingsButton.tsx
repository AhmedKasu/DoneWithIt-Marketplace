import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SellIcon from '@mui/icons-material/Sell';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
  onSelect?: () => void;
  isSelected?: boolean;
  label?: string;
  isSmallScreen?: boolean;
}

export default function UserListingsButton({
  onSelect,
  isSelected,
  label = 'Selling',
  isSmallScreen = false,
}: Props) {
  const iconColor = isSelected ? 'white' : 'black';
  const containerColor = isSelected ? 'primary.main' : '#e9ebee';

  if (isSmallScreen)
    return (
      <Box
        onClick={onSelect}
        sx={{
          mr: 2,
          height: '34px',
          width: '34px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e9ebee',
          borderRadius: '50%',
          boxShadow: 3,
          '&:hover': {
            backgroundColor: '#D3D3D3',
            cursor: 'pointer',
          },
        }}>
        <PersonIcon fontSize='small' />
      </Box>
    );

  return (
    <Stack
      direction='row'
      onClick={onSelect}
      sx={{
        width: '95%',
        mb: 1,
        borderRadius: '10px',
        backgroundColor: isSelected ? '#f7f7f7' : 'transparent',
        transition: 'background-color 0.1s ease',
        '&:hover': {
          backgroundColor: '#f7f7f7',
          cursor: 'pointer',
        },
      }}>
      <Box
        sx={{
          backgroundColor: containerColor,
          width: '36px',
          height: '36px',
          borderRadius: 18,
          boxShadow: 1,
          m: 1,
          ml: 1,
          mr: 1.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SellIcon sx={{ color: iconColor }} fontSize='small' />
      </Box>

      <Box
        sx={{
          width: '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Typography
          sx={{
            alignSelf: 'center',
            fontSize: '.95rem',
            color: 'black',
            fontFamily: 'inherit',
          }}
          variant='h6'>
          {label}
        </Typography>
        {!isSelected && <ArrowForwardIosIcon sx={{ color: 'gray' }} />}
      </Box>
    </Stack>
  );
}
