import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import useGetProducts from '../hooks/useGetProducts';

import Products from '../components/Products';

export default function Home() {
  const { data: products } = useGetProducts();
  const theme = useTheme();

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
            <Typography variant='h6'>Categories</Typography>
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
        {products && <Products products={products} />}
      </Box>
    </Box>
  );
}
