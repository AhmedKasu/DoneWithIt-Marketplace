import Box from '@mui/material/Box';

interface MessageIconProps {
  size?: number;
}

export default function MessageIcon({ size = 18 }: MessageIconProps) {
  const boxSize = size + 18;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: boxSize,
        backgroundColor: '#e9ebee',
        height: boxSize,
        borderRadius: boxSize / 2,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#d8dadb',
          cursor: 'pointer',
        },
      }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        x='0px'
        y='0px'
        width={size}
        height={size}
        viewBox='0 0 50 50'>
        <path d='M 25 2 C 12.300781 2 2 11.601563 2 23.5 C 2 29.800781 4.898438 35.699219 10 39.800781 L 10 48.601563 L 18.601563 44.101563 C 20.699219 44.699219 22.800781 44.898438 25 44.898438 C 37.699219 44.898438 48 35.300781 48 23.398438 C 48 11.601563 37.699219 2 25 2 Z M 27.300781 30.601563 L 21.5 24.398438 L 10.699219 30.5 L 22.699219 17.800781 L 28.601563 23.699219 L 39.101563 17.800781 Z'></path>
      </svg>
    </Box>
  );
}
