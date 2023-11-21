import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

import SideBarHeader from './SideBarHeader';
import SearchBar from './SearchBar';
import CategoriesList from './CategoriesList';
import CreateListingButton from './CreateListingButton';
import UserListingsButton from './UserListingsButton';

import { Category } from '../types';
import { useAuthContext } from '../context/authContext';

interface Props {
  categories: Category[];
  categoryId: number;
  searchQuery: string;
  handleProductSearch: (variables: FieldValues) => void;
  setCategoryId: (categoryId: number) => void;
}

export default function SideBar({
  categories,
  categoryId,
  searchQuery,
  handleProductSearch,
  setCategoryId,
}: Props) {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const sideBarWidth = '360px';
  return (
    <Box
      sx={{
        pt: 6.4,
        width: '360px',
        height: '100%',
        overflowY: 'scroll',
        backgroundColor: 'appBg.sidebar',
        boxShadow: 2,
      }}>
      <Card
        elevation={0}
        sx={{
          position: 'fixed',
          height: '100px',
          top: 63,
          width: sideBarWidth,
          zIndex: 9,
        }}>
        <Box sx={{ ml: 2 }}>
          <SideBarHeader
            categories={categories}
            categoryId={categoryId}
            searchQuery={searchQuery}
          />
          <SearchBar onSubmit={handleProductSearch} />
          <Divider sx={{ mt: 1, mb: 1, width: '95%' }} />
        </Box>
      </Card>

      <Box
        sx={{
          mt: '110px',
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

        {categories && (
          <CategoriesList
            categories={categories}
            onCategorySelect={(categoryId) => setCategoryId(categoryId)}
          />
        )}
      </Box>
    </Box>
  );
}
