import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface Props {
  refetch: () => void;
}

export default function NoListing({ refetch }: Props) {
  const textColor: string = '#808080';
  return (
    <Box
      display='flex'
      height='90vh'
      alignItems='center'
      justifyContent='center'>
      <Stack
        sx={{ width: { xs: '300px', sm: '400px' } }}
        direction='column'
        alignItems='center'
        justifyContent='center'>
        <img
          alt='search'
          src='https://static.xx.fbcdn.net/rsrc.php/y_/r/Krj1JsX3uTI.svg'
          height={120}
        />
        <Typography
          variant='h4'
          sx={{
            p: 1.5,
            fontSize: '1.3rem',
            fontWeight: 800,
            color: textColor,
          }}>
          No Listings Found!
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{
            fontSize: '1rem',
            color: textColor,
            textAlign: 'center',
            whiteSpace: 'normal',
            lineHeight: '1.6rem',
          }}>
          Try a new search. Check spelling, change your filters, or try a less
          specific search term.
        </Typography>
        <Button sx={{ m: 2 }} variant='contained' onClick={refetch}>
          Browse Marketplace
        </Button>
      </Stack>
    </Box>
  );
}
