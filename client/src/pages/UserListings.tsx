import { useState } from 'react';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import CreateListingButton from '../components/Side_Top_Bar/CreateListingButton';
import UserListingsButton from '../components/Side_Top_Bar/UserListingsButton';
import LongMenu from '../components/Product/LongMenu';
import PrevPrice from '../components/Product/PrevPrice';

import Error from '../components/Feedback/Error';
import Success from '../components/Feedback/Success';
import GoBack from '../components/Feedback/GoBack';

import { useAuthContext } from '../context/authContext';
import { useScreenBreakingPoints } from '../context/screenBreakpoints';

import useGetUser from '../hooks/user/useGetUser';
import useUpdateProductStatus from '../hooks/product/useUpdateProductStatus';
import useDeleteProduct from '../hooks/product/useDeleteProduct';
import useHandleNotifications from '../hooks/useHandleNotifications';

import {
  capitalizeFirstLetter,
  getPreviousPrice,
  getProductStatusColor,
} from '../helpers/product';

export default function UserListings() {
  const { currentUser } = useAuthContext();
  const { data: user } = useGetUser(currentUser?.id as number);

  const {
    mutate: updateProductStatus,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateProductStatus();
  const {
    mutate: deleteProduct,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteProduct();

  const { isSmallScreen } = useScreenBreakingPoints();
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useHandleNotifications(deleteError, setShowError);
  useHandleNotifications(updateError, setShowError);
  useHandleNotifications(deleteSuccess, setShowDeleteSuccess);
  useHandleNotifications(updateSuccess, setShowUpdateSuccess);

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
          <GoBack currentPage='Selling' previousPage='Marketplace' />

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
        <Error
          message='Unexpected error occurred. Please try again.'
          open={showError}
        />
        <Success
          message='Successfully updated product status.'
          open={showUpdateSuccess}
        />
        <Success
          message='Successfully deleted product.'
          open={showDeleteSuccess}
          testId='delete-success-alert'
        />

        {(!user?.products || user.products.length === 0) && (
          <Stack spacing={3}>
            <Typography
              variant='h6'
              component='div'
              sx={{
                pt: { md: 10 },
                fontSize: { xs: '1rem', sm: '1.2rem' },
                fontWeight: 900,
              }}>
              You currently do not have any listings.
            </Typography>
            <CreateListingButton
              onCreateListing={() => navigate('/createListing')}
            />
          </Stack>
        )}

        {user?.products.map((product) => {
          const { prevPrice } = getPreviousPrice(product.priceHistories);
          const statusColor = getProductStatusColor(product.status);
          return (
            <Card
              id={`product-${product.id}`}
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

                    <Typography variant='body2'>
                      €{product.price}{' '}
                      {prevPrice && <PrevPrice prevPrice={prevPrice} />}
                    </Typography>

                    <Stack direction='row' spacing={1}>
                      <Typography
                        sx={{
                          fontSize: { xs: '.8rem', sm: '.9rem' },
                          mb: { xs: 1, sm: 0 },
                          color: statusColor,
                        }}
                        color='text.secondary'>
                        {`${capitalizeFirstLetter(product.status)}.`}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { xs: '.8rem', sm: '.9rem' },
                          mb: { xs: 1, sm: 0 },
                        }}
                        color='text.secondary'>
                        {`Listed on ${new Date(
                          product.createdAt as string
                        ).toLocaleDateString()}`}
                      </Typography>
                    </Stack>

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
                        id={`product-${product.id}-status`}
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
                          fontSize: { xs: '.7rem', sm: '.9rem', md: '1rem' },
                        }}>
                        {product.status !== 'sold'
                          ? '✔ Mark as sold'
                          : 'Mark as available'}
                      </Button>
                      <LongMenu
                        productStatus={product.status}
                        onViewClick={() => navigate(`/products/${product.id}`)}
                        onEditClick={() =>
                          navigate(`/products/edit/${product.id}`)
                        }
                        onPendingClick={() =>
                          updateProductStatus({
                            userId: +user.id,
                            productId: product.id,
                            status: 'pending',
                          })
                        }
                        onDeleteClick={() =>
                          deleteProduct({
                            productId: product.id,
                            userId: +user.id,
                          })
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
