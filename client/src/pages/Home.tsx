import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import useGetProducts from '../hooks/useGetProducts';

import Products from '../components/Products';

export default function Home() {
  const { data: products } = useGetProducts();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#eceff1',
      }}>
      {!isSmallScreen && (
        <Box
          sx={{ width: '360px', minHeight: '100vh', backgroundColor: 'white' }}>
          <Container sx={{ pt: 7, maxWidth: '100%' }}>
            <Paper elevation={2}>
              <Typography variant='h6'>Sidebar</Typography>
            </Paper>
          </Container>
        </Box>
      )}
      <Box
        sx={{
          pt: 6,
          flex: 1,
          minWidth: 'calc(100vw -360px)',
        }}>
        {products && <Products products={products} />}
      </Box>
    </Box>
  );
}
