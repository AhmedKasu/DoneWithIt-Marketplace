import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import useGetProducts from '../hooks/useGetProducts';
import useGetCategories from '../hooks/useGetCategories';

import Products from '../components/Products';
import CategoriesList from '../components/CategoriesList';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const { data: products } = useGetProducts(categoryId);
  const { data: categories } = useGetCategories();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const sideBarWidth = '360px';
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
            sx={{
              position: 'fixed',
              height: '100px',
              top: 63,
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
          minWidth: 'calc(100vw - 360px)',
        }}>
        {products && products.length > 0 ? (
          <Products products={products} />
        ) : (
          <Typography sx={{ p: 15, pl: 20 }} variant='h6'>
            There is currently no intem!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
