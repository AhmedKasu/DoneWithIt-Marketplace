import Typography from '@mui/material/Typography';

import { Category } from '../../types';

interface Props {
  searchQuery: string;
  categories: Category[];
  categoryId: number;
}

const headerStyles = {
  mb: 1,
  fontSize: '1.5rem',
  color: 'black',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const navigatorStyles = {
  mt: 1,
  fontSize: '.8rem',
  color: 'grey',
  fontFamily: 'inherit',
};

export default function SideBarHeader({
  searchQuery,
  categories,
  categoryId,
}: Props) {
  const { name: categoryName } =
    categories.find((c) => c.id === categoryId) || {};
  const showNavigator: boolean = !!searchQuery || !!categoryId;
  const navigatorMarginTop = showNavigator ? 1 : 0;

  const headerText = searchQuery
    ? 'Search results'
    : categoryId
    ? categoryName
    : 'Marketplace';

  return (
    <>
      {showNavigator && (
        <Typography sx={{ ...navigatorStyles, mt: navigatorMarginTop }}>
          {`Marketplace ${categoryId ? `▸ ${categoryName}` : ''}`}
        </Typography>
      )}

      <Typography sx={headerStyles} variant='h2'>
        {headerText}
      </Typography>
    </>
  );
}
