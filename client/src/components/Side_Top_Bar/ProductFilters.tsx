import { FieldValues } from 'react-hook-form';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PriceFilter from './PriceFilter';
import ConditionFilter from './ConditionFilter';
import StatusFilter from './StatusFilter';

import { useFiltersContext } from '../../context/FiltersContext';
import { Product } from '../../types';

interface Props {
  showHeader?: boolean;
}

export default function ProductFilters({ showHeader = true }: Props) {
  const { setMinPrice, setMaxPrice, setCondition, setStatus } =
    useFiltersContext();

  const handlePriceFilter = (variables: FieldValues) => {
    if (variables.min) setMinPrice(variables.min);
    if (variables.max) setMaxPrice(variables.max);
  };

  const handleConditionFilter = (condition: Product['condition']) => {
    setCondition(condition);
  };

  const handleStatusFilter = (status: Product['status']) => {
    setStatus(status);
  };

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
      <StatusFilter onFilterStatus={handleStatusFilter} />
    </Box>
  );
}
