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

import UserAvatar from '../components/NavBar/UserAvatar';
import PrevPrice from '../components/Product/PrevPrice';
import GoBack from '../components/Feedback/GoBack';

import {
  calculateDateDifference,
  capitalizeFirstLetter,
  getPreviousPrice,
  getProductStatusColor,
} from '../helpers/product';

import { useScreenBreakingPoints } from '../context/screenBreakpoints';
import useGetProduct from '../hooks/useGetProduct';
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const PrevArrow = (props: ArrowProps) => {
  const isExtraSmallScreen = useScreenBreakingPoints();
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        left: '80px',
        top: isExtraSmallScreen ? '104%' : '102%',
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
  const isExtraSmallScreen = useScreenBreakingPoints();
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'absolute',
        right: '50px',
        top: isExtraSmallScreen ? '104%' : '102%',
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
  const { data: product, isLoading, isError } = useGetProduct(id);

  const { isSmallScreen } = useScreenBreakingPoints();

  const { prevPrice } = getPreviousPrice(product?.priceHistories);

  const listedDate = calculateDateDifference(product?.createdAt as string).days;
  const listedDay =
    listedDate === 0
      ? 'Listed Today.'
      : listedDate === 1
      ? 'Listed Yesterday.'
      : `Listed ${listedDate} days ago.`;

  const listedWeeks = calculateDateDifference(
    product?.createdAt as string
  ).weeks;

  const listedWeek =
    listedWeeks === 0
      ? 'Listed this week.'
      : listedWeeks === 1
      ? 'Listed last week.'
      : `Listed ${listedWeeks} ${listedWeeks < 2 ? 'week' : 'weeks'} ago.`;

  const productStatusColor = getProductStatusColor(product?.status);

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return <div>Sorry, an unexpected server error has occurred.</div>;

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
          pl: { xs: 0, md: 1 },
        }}>
        {!isSmallScreen && (
          <Box sx={{ pt: 10, mr: 1 }}>
            <GoBack />
          </Box>
        )}

        <Box
          sx={{
            order: { xs: 1, md: 0 },
            width: {
              md: '98%',
              ml: '98%',
              lg: '80%',
              xl: '70%',
              xxxl: '45%',
            },
            height: { xs: '45vh' },
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
                  alt={product?.title + index}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
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
          pb: 10,
          height: { xs: '55vh', md: '100vh ' },
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
          €{product?.price} {prevPrice && <PrevPrice prevPrice={prevPrice} />}
        </Typography>

        <Typography
          variant='subtitle2'
          sx={{
            fontSize: '.9rem',
            color: 'gray',
          }}>
          {listedWeeks > 0 ? `${listedWeek}` : `${listedDay}`}
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
          height: ${isSmallScreen ? '40vh' : '90vh'};
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
