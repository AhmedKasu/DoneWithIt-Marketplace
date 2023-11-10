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
import StorefrontIcon from '@mui/icons-material/Storefront';

interface Props {
  categoryId: number;
  label: string;
  onSelect: (categoryId: number) => void;
  isSelected: boolean;
}

const icons: { [key: number]: React.ElementType } = {
  0: StorefrontIcon,
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

export default function Category({
  categoryId,
  label,
  onSelect,
  isSelected,
}: Props) {
  const CategoryIcon = icons[categoryId];

  const iconColor = isSelected ? 'white' : 'black';
  const containerColor = isSelected ? 'primary.main' : '#e9ebee';
  return (
    <Stack
      direction='row'
      onClick={() => onSelect(categoryId)}
      sx={{
        width: '97%',
        borderRadius: '10px',
        backgroundColor: isSelected ? '#f7f7f7' : 'transparent',
        transition: 'background-color 0.1s ease',
        '&:hover': {
          backgroundColor: '#f7f7f7',
          cursor: 'pointer',
        },
      }}>
      <Box
        sx={{
          backgroundColor: containerColor,
          width: '36px',
          height: '36px',
          borderRadius: 18,
          boxShadow: 1,
          m: 1,
          ml: 0,
          mr: 1.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {<CategoryIcon sx={{ color: iconColor }} fontSize='small' /> || (
          <DefaultCategoryIcon sx={{ color: iconColor }} fontSize='small' />
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
