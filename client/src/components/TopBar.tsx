import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';

import SearchBar from './SearchBar';
import CategoriesList from './CategoriesList';
import CreateListingButton from './CreateListingButton';
import UserListingsButton from './UserListingsButton';

import { Category } from '../types';

interface Props {
  handleSearch: (variables: FieldValues) => void;
  categories: Category[];
  handleCategorySelect: (categoryId: number) => void;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  pb: 2,
};

export default function Topbar({
  handleSearch,
  categories,
  handleCategorySelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleCategorySelectAndClose = (categoryId: number) => {
    handleCategorySelect(categoryId);
    handleClose();
  };

  return (
    <Box sx={{ p: 1, backgroundColor: 'white' }}>
      <Stack direction='column' spacing={1} sx={{ ml: 4 }}>
        <Stack direction='row' spacing={1}>
          <UserListingsButton
            isSmallScreen
            onSelect={() => navigate('me/selling')}
          />
          <CreateListingButton
            onCreateListing={() => navigate('createListing')}
            isSmallScreen
          />
          <Button
            variant='contained'
            size='small'
            onClick={handleOpen}
            sx={{
              borderRadius: 8,
              backgroundColor: '#e9ebee',
              fontWeight: 800,
              color: 'black',
              '&:hover': {
                backgroundColor: '#D3D3D3',
              },
            }}>
            All Categories
          </Button>
        </Stack>
        <SearchBar onSubmit={handleSearch} />
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Paper
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={{ m: 2, ml: { sm: 20 }, fontWeight: 800 }}>
              Select Category
            </Typography>

            <Box
              onClick={handleClose}
              sx={{
                mr: 2,
                p: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#e9ebee',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#D3D3D3',
                  cursor: 'pointer',
                },
              }}>
              <CloseIcon sx={{ color: 'black' }} />
            </Box>
          </Paper>

          <Box sx={{ ml: 2 }}>
            <CategoriesList
              showHeader={false}
              categories={categories}
              onCategorySelect={handleCategorySelectAndClose}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
