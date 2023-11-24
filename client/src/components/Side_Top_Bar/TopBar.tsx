import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TuneIcon from '@mui/icons-material/Tune';

import SearchBar from './SearchBar';
import CategoriesList from '../Category/CategoriesList';
import CreateListingButton from './CreateListingButton';
import UserListingsButton from './UserListingsButton';
import CustomModal from './CustomModal';
import ProductFilters from './ProductFilters';

import { Category } from '../../types';
import { useAuthContext } from '../../context/authContext';

interface Props {
  handleSearch: (variables: FieldValues) => void;
  categories: Category[];
  handleCategorySelect: (categoryId: number) => void;
  searchQuery: string;
  handlePriceFilter: (variables: FieldValues) => void;
}

export default function Topbar({
  handleSearch,
  categories,
  handleCategorySelect,
  searchQuery,
  handlePriceFilter,
}: Props) {
  const [openCategories, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const { currentUser } = useAuthContext();

  const handleOpenCategories = () => setOpen(true);
  const handleCloseCategories = () => setOpen(false);

  const handleOpenFilters = () => setOpenFilters(true);
  const handleCloseFilters = () => setOpenFilters(false);

  const navigate = useNavigate();

  const handleCategorySelectAndClose = (categoryId: number) => {
    handleCategorySelect(categoryId);
    handleCloseCategories();
  };

  return (
    <Box sx={{ p: 1, backgroundColor: 'white' }}>
      <Stack direction='column' spacing={1} sx={{ ml: { xs: 2, md: 4 } }}>
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
            onClick={handleOpenCategories}
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
          {searchQuery && (
            <Button
              variant='contained'
              disableElevation
              size='small'
              startIcon={<TuneIcon />}
              onClick={handleOpenFilters}
              sx={{
                mb: 2,
                ml: 1,
                backgroundColor: '#e3f2fd',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: '#F8F8FF',
                },
              }}>
              Filters
            </Button>
          )}
        </Stack>
        <SearchBar onSubmit={handleSearch} />
      </Stack>
      <CustomModal
        onClose={handleCloseCategories}
        open={openCategories}
        modalTitle='Categories List'>
        <CategoriesList
          showHeader={false}
          categories={categories}
          onCategorySelect={handleCategorySelectAndClose}
        />
      </CustomModal>

      <CustomModal
        onClose={handleCloseFilters}
        open={openFilters}
        modalTitle='Filters'>
        <ProductFilters
          handlePriceFilter={handlePriceFilter}
          showHeader={false}
        />
      </CustomModal>
    </Box>
  );
}
