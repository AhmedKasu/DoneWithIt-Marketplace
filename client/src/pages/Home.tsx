import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';

import { FieldValues } from 'react-hook-form';

import useGetProducts from '../hooks/useGetProducts';
import useGetCategories from '../hooks/useGetCategories';

import Products from '../components/Products';
import CategoriesList from '../components/CategoriesList';
import SearchBar from '../components/SearchBar';
import SideBarHeader from '../components/SideBarHeader';
import NoListing from '../components/NoListing';

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
  const sideBarWidth = '360px';

  const renderMainContent = () => {
    if (products && products.length > 0) {
      return <Products products={products} />;
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
      {!isSmallScreen && (
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
          <Card
            elevation={0}
            sx={{
              position: 'fixed',
              height: '100px',
              top: 63,
              width: sideBarWidth,
              zIndex: 9,
              width: sideBarWidth,
              zIndex: 9,
            }}>
            <Box sx={{ ml: 2 }}>
              <Typography
                sx={{
                  mt: 1,
                  mb: 1,
                  fontSize: '1.5rem',
                  color: 'black',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                }}
                variant='h2'>
                Marketplace
              </Typography>
              <SearchBar />
            </Box>
          </Card>

          <Box
            onScroll={(e) => console.log(e)}
            sx={{
              mt: '110px',
              width: sideBarWidth,
              mt: '110px',
              width: sideBarWidth,
            }}>
            {categories && (
              <CategoriesList
                categories={categories}
                onCategorySelect={(categoryId) => setCategoryId(categoryId)}
              />
            )}
          </Box>
        </Box>
      )}


      <Box
        sx={{
          pt: 6,
          flex: 1,
          overflowY: 'scroll',
          minWidth: { xs: '100vw', lg: 'calc(100vw - 360px)' },
        }}>
        {renderMainContent()}
      </Box>
    </Box>
  );
}
