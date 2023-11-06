import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CheckroomIcon from '@mui/icons-material/Checkroom';

import BrushIcon from '@mui/icons-material/Brush';
import DefaultCategoryIcon from '@mui/icons-material/Category';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import HomeIcon from '@mui/icons-material/Home';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import PetsIcon from '@mui/icons-material/Pets';
import SnowboardingIcon from '@mui/icons-material/Snowboarding';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';

interface Props {
  categoryId: number;
  label: string;
  onClick: () => void;
}

const icons: { [key: number]: React.ElementType } = {
  1: TabletAndroidIcon,
  2: CelebrationIcon,
  3: LoyaltyIcon,
  4: ContentCutIcon,
  5: CheckroomIcon,
  6: HomeIcon,
  7: BrushIcon,
  8: SnowboardingIcon,
  9: SportsEsportsIcon,
  10: PetsIcon,
};

export default function Category({ categoryId, label, onClick }: Props) {
  const CategoryIcon = icons[categoryId];
  return (
    <Stack
      direction='row'
      onClick={onClick}
      sx={{
        width: '97%',
        transition: 'background-color 0.1s ease',
        '&:hover': {
          backgroundColor: '#f7f7f7',
          borderRadius: '10px',
          cursor: 'pointer',
        },
      }}>
      <Box
        sx={{
          backgroundColor: '#e9ebee',
          width: '36px',
          height: '36px',
          borderRadius: 18,
          boxShadow: 1,
          m: 1,
          mr: 1.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {<CategoryIcon fontSize='small' /> || (
          <DefaultCategoryIcon fontSize='small' />
        )}
      </Box>
      <Typography
        sx={{
          alignSelf: 'center',
          fontSize: '.95rem',
          color: 'black',
          fontFamily: 'inherit',
        }}
        variant='h6'>
        {label}
      </Typography>
    </Stack>
  );
}
