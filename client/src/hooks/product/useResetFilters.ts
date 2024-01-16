import { useFiltersContext } from '../../context/FiltersContext';

const useResetFilters = () => {
  const { setCondition, setMaxPrice, setMinPrice, setSearchQuery, setStatus } =
    useFiltersContext();

  const resetFilters = () => {
    setCondition(undefined);
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setSearchQuery('');
    setStatus(undefined);
  };
  return resetFilters;
};

export default useResetFilters;
