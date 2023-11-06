import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import useGetProducts from '../hooks/useGetProducts';
import useGetCategories from '../hooks/useGetCategories';

import Products from '../components/Products';
import CategoriesList from '../components/CategoriesList';

export default function Home() {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const { data: products } = useGetProducts(categoryId);
  const { data: categories } = useGetCategories();
  const theme = useTheme();

  console.log('products', products);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
          <Box
            sx={{
              position: 'fixed',
              height: '100px',
              top: 63,
              left: 7,
              width: '360px',
            }}>
            <Typography variant='h6'>Marketplace search bar</Typography>

            <Divider />
          </Box>

          <Box
            sx={{
              mt: '87px',
              p: 0,
              width: '360px',
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
