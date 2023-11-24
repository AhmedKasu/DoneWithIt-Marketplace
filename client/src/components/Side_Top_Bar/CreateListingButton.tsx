import Button from '@mui/material/Button';

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
          fontWeight: 800,
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
        ml: 1,
        width: '92%',
        backgroundColor: '#e3f2fd',
        color: 'primary.main',
        '&:hover': {
          backgroundColor: '#F8F8FF',
        },
      }}>
      + Create New Listing
    </Button>
  );
}
