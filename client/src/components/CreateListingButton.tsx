import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  onCreateListing: () => void;
  isSmallScreen?: boolean;
}

export default function CreateListingButton({
  onCreateListing,
  isSmallScreen = false,
}: Props) {
  if (isSmallScreen)
    return (
      <Button
        variant='contained'
        size='small'
        onClick={onCreateListing}
        sx={{
          borderRadius: 8,
          backgroundColor: '#e9ebee',
          color: 'black',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#D3D3D3',
          },
        }}>
        Sell
      </Button>
    );

  return (
    <Button
      variant='contained'
      disableElevation
      onClick={onCreateListing}
      sx={{
        mb: 2,
        width: '90%',
        backgroundColor: '#e3f2fd',
        color: 'primary.main',
        '&:hover': {
          backgroundColor: '#F8F8FF',
        },
      }}>
      <Typography
        variant='button'
        sx={{
          textTransform: 'none',
        }}>
        + Create New Listing
      </Typography>
    </Button>
  );
}
