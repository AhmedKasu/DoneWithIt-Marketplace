import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid container sx={{ backgroundColor: '#eceff1' }}>
      {!isSmallScreen && (
        <Grid
          item
          sx={{
            width: '360px',
            backgroundColor: 'white',
          }}>
          <Paper elevation={2}>
            <Container sx={{ pt: 7, width: '100%' }}>
              <Typography variant='h6'>Sidebar</Typography>
            </Container>
          </Paper>
        </Grid>
      )}
      <Grid xs='auto' item sx={{ pt: 7 }}>
        <Container>
          <Typography variant='h6'>Main Content</Typography>
        </Container>
      </Grid>
    </Grid>
  );
}
