import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FieldValues } from 'react-hook-form';

import useGetProducts from '../hooks/useGetProducts';
import useGetCategories from '../hooks/useGetCategories';

import Products from '../components/Products';
import NoListing from '../components/NoListing';
import SideBar from '../components/SideBar';
import Topbar from '../components/TopBar';

export default function Home() {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');

  const { data: products } = useGetProducts(categoryId, searchQuery);
  const { data: categories } = useGetCategories();
  const theme = useTheme();

  const handleProductSearch = (variables: FieldValues) => {
    setSearchQuery(variables.search);
  };

  const handleRefetch = () => {
    setSearchQuery('');
    setCategoryId(undefined);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const renderMainContent = () => {
    if (products && products.length > 0) {
      if (isSmallScreen && categories) {
        return (
          <>
            <Topbar
              handleSearch={handleProductSearch}
              categories={categories}
              handleCategorySelect={(categoryId) => setCategoryId(categoryId)}
            />
            <Products products={products} />
          </>
        );
      } else {
        return <Products products={products} />;
      }
    } else {
      return <NoListing refetch={handleRefetch} />;
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        backgroundColor: 'appBg.main',
        height: '100vh',
      }}>
      {!isSmallScreen && categories && (
        <SideBar
          categories={categories}
          categoryId={categoryId}
          handleProductSearch={handleProductSearch}
          setCategoryId={setCategoryId}
        />
      )}

      <Box
        sx={{
          pt: { xs: 5, sm: 6 },
          flex: 1,
          overflowY: 'scroll',
          minWidth: { xs: '100vw', lg: 'calc(100vw - 360px)' },
        }}>
        {renderMainContent()}
      </Box>
    </Box>
  );
}
