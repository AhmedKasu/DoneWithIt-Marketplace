import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useParams } from 'react-router';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import RecyclingIcon from '@mui/icons-material/Recycling';

import UserAvatar from '../components/UserAvatar';

import {
  calculateDateDifference,
  capitalizeFirstLetter,
} from '../helpers/product';

import { useIsSmallScreen } from '../context/screenBreakpoints';
import useGetProduct from '../hooks/useGetProduct';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const PrevArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        left: '80px',
        top: '102%',
        zIndex: 10,
      }}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={onClick}
    />
  );
};

const NextArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        right: '50px',
        top: '102%',
        zIndex: 10,
      }}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={onClick}
    />
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProduct(id);

  const { isSmallScreen } = useIsSmallScreen();

  const listedDate = calculateDateDifference(product?.createdAt as string).days;
  const listedWeeks = calculateDateDifference(
    product?.createdAt as string
  ).weeks;

  const productStatusColor =
    product?.status === 'sold'
      ? 'red'
      : product?.status == 'pending'
      ? 'orange'
      : 'green';

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateAreas: { xs: '"paper" "slider"', md: '"slider paper"' },
        gridTemplateColumns: { xs: '1fr', md: '1fr 360px' },
        height: '100vh',
        overflowY: 'scroll',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        <Box
          sx={{
            order: { xs: 1, md: 0 },
            width: {
              md: '100%',
              ml: '98%',
              lg: '80%',
              xl: '70%',
              xxxl: '45%',
            },
            height: { xs: '50vh' },
          }}>
          <Slider
            {...settings}
            className='custom-slider'
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}>
            {product?.imageUrls.map((image, index) => (
              <div key={index} className='slick-slide'>
                <img
                  src={image}
                  alt='productimage'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </Slider>
        </Box>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: { xs: '50vh', md: '100vh ' },
          overflowY: 'scroll',
        }}>
        <Typography
          variant='h4'
          sx={{
            mt: { xs: 4, sm: 4, md: 8 },
            fontSize: '1.5rem',
            fontWeight: 900,
          }}>
          {product?.title}
        </Typography>

        <Typography sx={{ fontSize: '1rem', fontWeight: 900 }}>
          €{product?.price}
        </Typography>

        <Typography
          variant='subtitle2'
          sx={{
            fontSize: '.9rem',
            color: 'gray',
          }}>
          {listedWeeks > 0
            ? `Listed ${listedWeeks} ${listedWeeks < 2 ? 'week' : 'weeks'} ago.`
            : `Listed ${listedDate} ${listedDate < 2 ? 'day' : 'days'} ago.`}
        </Typography>

        <Typography
          variant='h5'
          sx={{ mt: 2, fontSize: '1rem', fontWeight: 900 }}>
          Details
        </Typography>

        <Stack direction='row' spacing={12} sx={{ mt: 1 }} alignItems='center'>
          <Typography variant='h5' sx={{ fontSize: '.9rem', fontWeight: 900 }}>
            Condition
          </Typography>
          <Typography variant='body1' sx={{ fontWeight: 400 }}>
            {product?.condition}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={15} alignItems='center'>
          <Typography variant='h5' sx={{ fontSize: '.9rem', fontWeight: 900 }}>
            Status
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontWeight: 400, color: productStatusColor }}>
            {capitalizeFirstLetter(product?.status as string)}
          </Typography>
        </Stack>

        <Typography variant='body1' sx={{ mt: 1 }}>
          {product?.description}
        </Typography>

        <Divider sx={{ mt: 5 }} />

        <Typography
          variant='h5'
          sx={{ mt: 5, fontSize: '1rem', fontWeight: 900 }}>
          Seller information
        </Typography>

        <Stack direction='row' spacing={2} sx={{ mt: 1.5 }} alignItems='center'>
          <UserAvatar name={product?.seller.name as string} isCurrentUser />
          <Typography variant='body1' sx={{ fontWeight: 400 }}>
            {product?.seller.name}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={2} sx={{ mt: 1.5 }} alignItems='center'>
          <RecyclingIcon sx={{ display: { color: 'gray' } }} />
          <Typography variant='body1' sx={{ mt: 2 }}>
            {`Joined DoneWithIt in ${new Date(
              product?.seller.createdAt as string
            ).getFullYear()}`}
          </Typography>
        </Stack>
      </Paper>
      <style>{`
        .custom-slider .slick-slide {
          height: ${isSmallScreen ? '47vh' : '90vh'};
        }
        .custom-slider .slick-prev:before{
          margin-left: -50px;
        }
        .custom-slider .slick-next:before{
          margin-right: -50px;
        }
        .custom-slider .slick-prev:before,
        .custom-slider .slick-next:before {
          font-size: 30px;
          color: black;
        }
      `}</style>
    </Box>
  );
}
