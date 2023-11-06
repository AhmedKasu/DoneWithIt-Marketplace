import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Category from './Category';
import List from '@mui/material/List';

import { Category as CategoryType } from '../types';

interface Props {
  categories: CategoryType[];
  onCategorySelect: (categoryId: number) => void;
}

export default function CategoriesList({
  categories,
  onCategorySelect,
}: Props) {
  return (
    <Box sx={{ ml: 1 }}>
      <Typography
        sx={{
          alignSelf: 'center',
          fontSize: '1rem',
          ml: 1,
          color: 'black',
          fontFamily: 'inherit',
          fontWeight: 'bold',
        }}
        variant='h6'>
        Categories
      </Typography>
      <List sx={{ p: 0 }}>
        {categories.map((category) => (
          <Category
            key={category.id}
            categoryId={category.id}
            label={category.name}
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </List>
    </Box>
  );
}
