import { FieldValues } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PriceFilter from './PriceFilter';

interface Props {
  handlePriceFilter: (variables: FieldValues) => void;
  showHeader?: boolean;
}

export default function ProductFilters({
  showHeader = true,
  handlePriceFilter,
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
      <PriceFilter
        onFilterPrice={(variables) => {
          handlePriceFilter(variables);
        }}
      />
    </Box>
  );
}
