import { FieldValues } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PriceFilter from './PriceFilter';
import ConditionFilter from './ConditionFilter';

import { Product } from '../../types';

interface Props {
  handlePriceFilter: (variables: FieldValues) => void;
  handleConditionFilter: (condition: Product['condition']) => void;
  showHeader?: boolean;
}

export default function ProductFilters({
  showHeader = true,
  handlePriceFilter,
  handleConditionFilter,
}: Props) {
  return (
    <Box sx={{ m: 1 }}>
      {showHeader && (
        <Typography
          variant='h5'
          sx={{
            mb: 0.5,
            fontSize: '1rem',
            color: 'black',
            fontFamily: 'inherit',
            fontWeight: 'bold',
          }}>
          Filters
        </Typography>
      )}
      <PriceFilter onFilterPrice={handlePriceFilter} />
      <ConditionFilter onFilterCondition={handleConditionFilter} />
    </Box>
  );
}
