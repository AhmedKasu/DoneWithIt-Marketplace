import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import SideBarHeader from './SideBarHeader';
import SearchBar from './SearchBar';
import CategoriesList from '../Category/CategoriesList';
import CreateListingButton from './CreateListingButton';
import UserListingsButton from './UserListingsButton';
import ProductFilters from './ProductFilters';

import { Category } from '../../types';
import { useAuthContext } from '../../context/authContext';
import { useFiltersContext } from '../../context/FiltersContext';

interface Props {
  categories: Category[];
  showFilters: boolean;
}

export default function SideBar({ categories, showFilters }: Props) {
  const { currentUser } = useAuthContext();
  const { setSearchQuery, searchQuery, setCategoryId, categoryId } =
    useFiltersContext();
  const navigate = useNavigate();

  const handleProductSearch = (variables: FieldValues) => {
    setSearchQuery(variables.search);
  };

  const sideBarWidth = '360px';
  const sideBarMarginTop = searchQuery || categoryId ? '130px' : '110px';
  return (
    <Box
      sx={{
        pt: 6.4,
        pb: 8,
        width: '360px',
        height: '100%',
        overflowY: 'scroll',
        backgroundColor: 'appBg.sidebar',
        boxShadow: 2,
      }}>
      <Box sx={{ display: 'flex' }}>
        <Card
          elevation={0}
          sx={{
            position: 'fixed',
            flex: 1,
            top: 63,
            width: sideBarWidth,
            zIndex: 9,
          }}>
          <Box sx={{ ml: 2, mt: 2 }}>
            <SideBarHeader
              categories={categories}
              categoryId={categoryId}
              searchQuery={searchQuery as string}
            />
            <SearchBar onSubmit={handleProductSearch} />
            <Divider sx={{ mt: 1.5, width: '95%' }} />
          </Box>
        </Card>

        <Box
          sx={{
            mt: sideBarMarginTop,
            flex: 1,
            width: sideBarWidth,
            ml: 1,
          }}>
          {currentUser && (
            <UserListingsButton
              onSelect={() => navigate('me/selling')}
              isSelected={false}
            />
          )}
          <CreateListingButton
            onCreateListing={() => navigate('createListing')}
          />
          <Divider sx={{ ml: 1, mb: 2, mr: 0, width: '92%' }} />

          {searchQuery && showFilters && (
            <>
              <ProductFilters />
              <Divider sx={{ ml: 1, mb: 2, mr: 0, width: '92%' }} />
            </>
          )}

          {categories && (
            <CategoriesList
              categories={categories}
              onCategorySelect={(categoryId) => setCategoryId(categoryId)}
              selectedCategory={categoryId}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
