import Typography from '@mui/material/Typography';

import { Category } from '../../types';

interface Props {
  searchQuery: string;
  categories: Category[];
  categoryId: number;
}

export default function SideBarHeader({
  searchQuery,
  categories,
  categoryId,
}: Props) {
  return (
    <Typography
      sx={{
        mt: 1,
        mb: 1,
        fontSize: '1.5rem',
        color: 'black',
        fontFamily: 'inherit',
        fontWeight: 'bold',
      }}
      variant='h2'>
      {searchQuery
        ? 'Search results'
        : categories && categoryId
        ? `${categories[categoryId - 1].name}`
        : 'Marketplace'}
    </Typography>
  );
}
