import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import SearchBar from './SearchBar';
import CategoriesList from '../Category/CategoriesList';
import CreateListingButton from './CreateListingButton';
import UserListingsButton from './UserListingsButton';
import CustomModal from './CustomModal';

import { Category } from '../../types';
import { useAuthContext } from '../../context/authContext';

interface Props {
  handleSearch: (variables: FieldValues) => void;
  categories: Category[];
  handleCategorySelect: (categoryId: number) => void;
}

export default function Topbar({
  handleSearch,
  categories,
  handleCategorySelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuthContext();

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
          {currentUser && (
            <UserListingsButton
              isSmallScreen
              onSelect={() => navigate('me/selling')}
            />
          )}
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
      <CustomModal onClose={handleClose} open={open}>
        <CategoriesList
          showHeader={false}
          categories={categories}
          onCategorySelect={handleCategorySelectAndClose}
        />
      </CustomModal>
    </Box>
  );
}
