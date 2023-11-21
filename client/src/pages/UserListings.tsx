import React from 'react';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import CreateListingButton from '../components/CreateListingButton';
import UserListingsButton from '../components/UserListingsButton';

import { useAuthContext } from '../context/authContext';
import { useScreenBreakingPoints } from '../context/screenBreakpoints';

import useGetUser from '../hooks/useGetUser';
import useUpdateProductStatus from '../hooks/useUpdateProductStatus';

import { capitalizeFirstLetter } from '../helpers/product';
import { Product } from '../types';

interface LongMenuProps {
  product: Product;
  onPendingClick: () => void;
  onViewClick: () => void;
  // onDeleteClick: () => void;
}

function LongMenu({ product, onPendingClick, onViewClick }: LongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePendingClick = () => {
    setAnchorEl(null);
    onPendingClick();
  };

  const handleDeleteClick = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{
          width: '50px',
          height: { xs: '30px', md: '35px' },
          ml: 1,
          backgroundColor: '#E5E4E2',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: '#D3D3D3',
            cursor: 'pointer',
          },
        }}
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 150,
              width: 200,
            },
          },
        }}>
        {product.status !== 'pending' && (
          <MenuItem onClick={handlePendingClick}>
            <ListItemIcon>
              <PauseCircleOutlineIcon fontSize='medium' />
            </ListItemIcon>
            <ListItemText>Mark as Pending</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={onViewClick}>
          <ListItemIcon>
            <PreviewIcon fontSize='medium' />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteForeverIcon fontSize='medium' />
          </ListItemIcon>
          <ListItemText>Delete Listing</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default function UserListings() {
  const { currentUser } = useAuthContext();
  const { data: user } = useGetUser(currentUser?.id as number);
  const { mutateAsync: updateProductStatus } = useUpdateProductStatus();

  const { isSmallScreen } = useScreenBreakingPoints();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateAreas: { xs: '"side" "main"', md: '"side main"' },
        gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
        height: '100vh',
        overflowY: 'scroll',
      }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: { xs: 180, md: '100vh' },
          zIndex: 100,
        }}>
        <Paper elevation={2} sx={{ height: '100%', pt: { xs: 6, md: 8 } }}>
          <Stack direction='row'>
            <Box
              sx={{
                ml: 2,
                mt: 1,
                height: '36px',
                width: '36px',
                borderRadius: 18,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',

                '&:hover': {
                  cursor: 'pointer',
                  boxShadow: 1,
                  backgroundColor: '#f7f7f7',
                },
              }}>
              <KeyboardBackspaceIcon
                onClick={() => navigate('/')}
                sx={{ color: 'gray' }}
              />
            </Box>
            <Stack direction='column' sx={{ ml: 2, mb: 1 }}>
              <Typography sx={{ fontSize: '.8rem', color: 'gray' }}>
                Marketplace
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  fontFamily: 'inherit',
                }}
                variant='h6'>
                Selling
              </Typography>
            </Stack>
          </Stack>

          <Stack sx={{ ml: 1 }}>
            <CreateListingButton
              onCreateListing={() => navigate('/createListing')}
            />
            {!isSmallScreen && (
              <>
                <UserListingsButton label='Your listings' isSelected />
                <Divider sx={{ mt: 2, mr: 0, width: '95%' }} />
              </>
            )}
          </Stack>
        </Paper>
      </Box>

      <Box
        sx={{
          mt: { xs: 0, md: 10 },
          mb: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {user?.products.map((product) => (
          <Card
            key={product.id}
            sx={{
              mt: 2,
              width: { xs: 350, sm: 600, md: 538, ml: 630, lg: 800 },
              height: { xs: 130, sm: 155, md: 160, lg: 170 },
              borderRadius: 2,
            }}>
            <CardContent>
              <Box sx={{ display: 'flex' }}>
                <Box
                  onClick={() => navigate(`/products/${product.id}`)}
                  sx={{
                    height: { xs: 100, sm: 120, md: 130, lg: 140 },
                    width: { xs: 100, sm: 120, md: 130, lg: 140 },
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}>
                  <img
                    width='100%'
                    height='100%'
                    style={{ objectFit: 'cover', borderRadius: 9 }}
                    src={product.imageUrls[0]}
                    alt={product.title}
                  />
                </Box>

                <Box
                  sx={{
                    width: { sm: 430, md: 450, lg: 600 },
                    ml: 1.5,
                  }}>
                  <Typography
                    variant='h5'
                    component='div'
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                      fontWeight: 900,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}>
                    {product.title}
                  </Typography>
                  <Typography variant='body2'>€{product.price}</Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '.8rem', sm: '.9rem' },
                      mb: { xs: 1, sm: 0 },
                    }}
                    color='text.secondary'>
                    {`${capitalizeFirstLetter(
                      product.status
                    )}.  Listed on ${new Date(
                      product.createdAt as string
                    ).toLocaleDateString()}`}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: '.8rem', sm: '.9rem' },
                      mb: { xs: 1, lg: 1.5 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: { xs: 'none', sm: '-webkit-box' },
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}
                    color='text.secondary'>
                    {product.description}
                  </Typography>

                  <Box sx={{ display: 'flex' }}>
                    <Button
                      variant='contained'
                      disableElevation
                      startIcon={
                        product.status === 'sold' ? (
                          <PlayCircleIcon />
                        ) : undefined
                      }
                      onClick={() =>
                        updateProductStatus({
                          status:
                            product.status !== 'sold' ? 'sold' : 'available',
                          userId: +user.id,
                          productId: product.id,
                        })
                      }
                      size={isSmallScreen ? 'small' : 'medium'}
                      sx={{
                        mb: 2,
                        ml: 1,
                        backgroundColor: '#e3f2fd',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: '#F8F8FF',
                        },
                      }}>
                      {product.status !== 'sold'
                        ? '✔ Mark as sold'
                        : 'Mark as available'}
                    </Button>
                    <LongMenu
                      product={product}
                      onViewClick={() => navigate(`/products/${product.id}`)}
                      onPendingClick={() =>
                        updateProductStatus({
                          userId: +user.id,
                          productId: product.id,
                          status: 'pending',
                        })
                      }
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
