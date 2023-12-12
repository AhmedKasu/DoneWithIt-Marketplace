import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import useGetProducts from '../hooks/useGetProducts';
import useGetCategories from '../hooks/useGetCategories';

import { useScreenBreakingPoints } from '../context/screenBreakpoints';
import { useFiltersContext } from '../context/FiltersContext';

import Products from '../components/Product/Products';
import NoListing from '../components/Feedback/NoListing';
import SideBar from '../components/Side_Top_Bar/SideBar';
import Topbar from '../components/Side_Top_Bar/TopBar';

export default function Home() {
  const {
    categoryId,
    setCategoryId,
    searchQuery,
    setSearchQuery,
    minPrice,
    maxPrice,
    condition,
    status,
  } = useFiltersContext();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProducts(
    categoryId,
    searchQuery,
    minPrice,
    maxPrice,
    condition,
    status
  );

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategories();

  const { isSmallScreen } = useScreenBreakingPoints();

  const handleRefetch = () => {
    setSearchQuery('');
    setCategoryId(0);
  };

  const showProductsHeader: boolean = searchQuery
    ? false
    : categoryId
    ? false
    : true;

  const isProductsAvailable = products && products.length > 0;
  const isCategoriesAvailable = categories && categories.length > 0;
  const isResoursesAvailable = isProductsAvailable && isCategoriesAvailable;
  const isErrors = productsError || categoriesError;

  const smallScreenContent = () => {
    if (categories) {
      return (
        <Box sx={{ pb: 10 }}>
          <Topbar categories={categories} />
          {isProductsAvailable ? (
            <Products products={products} showHeader={showProductsHeader} />
          ) : (
            <NoListing refetch={handleRefetch} />
          )}
        </Box>
      );
    }

    if (!isErrors && !isResoursesAvailable)
      return <NoListing refetch={handleRefetch} />;
  };

  const largeScreenContent = () => {
    if (isResoursesAvailable)
      return <Products products={products} showHeader={showProductsHeader} />;

    if (!isErrors && !isResoursesAvailable)
      return <NoListing refetch={handleRefetch} />;
  };

  if (productsLoading || categoriesLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <CircularProgress />
      </Box>
    );

  if (isErrors) throw new Error('Something went wrong!');

  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        backgroundColor: 'appBg.main',
        height: '100vh',
      }}>
      {!isSmallScreen && categories && (
        <SideBar categories={categories} showFilters={!!isProductsAvailable} />
      )}

      <Box
        sx={{
          pt: { xs: 5, sm: 6 },
          flex: 1,
          overflowY: 'scroll',
          minWidth: { xs: '100vw', md: 'calc(100vw - 360px)' },
        }}>
        {isSmallScreen ? smallScreenContent() : largeScreenContent()}
      </Box>
    </Box>
  );
}
