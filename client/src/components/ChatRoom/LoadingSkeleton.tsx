import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

export default function LoadingSkeleton() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: 300, md: 340 },
        height: 455,
      }}>
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            height: 50,
            boxShadow: 1,
          }}>
          <Skeleton variant='circular' width={40} height={40} />

          <Box sx={{ width: '70%', ml: { xs: 2, md: 1 } }}>
            <Skeleton variant='text' sx={{ width: '100%', fontSize: '1rem' }} />
          </Box>
        </Box>

        <Box
          sx={{
            height: 100,
          }}>
          <Box sx={{ display: 'flex', p: 1 }}>
            <Box
              sx={{
                ml: 1.5,
                mr: 2,
              }}>
              <Skeleton variant='circular' width={40} height={40} />
            </Box>
            <Box sx={{ width: '75%' }}>
              <Skeleton
                variant='text'
                sx={{ width: '30%', fontSize: '.8rem' }}
              />
              <Skeleton
                variant='text'
                sx={{ width: '70%', fontSize: '1rem' }}
              />
            </Box>
          </Box>

          <Skeleton
            variant='rectangular'
            width='90%'
            height={40}
            sx={{ ml: 2, mb: 1 }}
          />
        </Box>
      </>

      <Divider sx={{ height: 11 }} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: 300,
        }}>
        <Box
          sx={{
            width: '100%',
            padding: 1.5,
          }}>
          <Box sx={{ ml: 1, mb: 1, pt: 1.5 }}>
            <Skeleton
              variant='rectangular'
              width='100%'
              height={40}
              sx={{ borderRadius: 6 }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
