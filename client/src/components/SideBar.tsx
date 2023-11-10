import { FieldValues } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import SideBarHeader from './SideBarHeader';
import SearchBar from './SearchBar';
import CategoriesList from './CategoriesList';

import { Category } from '../types';

interface Props {
  categories: Category[];
  categoryId?: number;
  searchQuery?: string;
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
        </Box>
      </Card>

      <Box
        sx={{
          mt: '110px',
          width: sideBarWidth,
          ml: 2,
        }}>
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
