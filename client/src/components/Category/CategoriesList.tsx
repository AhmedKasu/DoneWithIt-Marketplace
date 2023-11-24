import { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Category from './Category';
import List from '@mui/material/List';

import { Category as CategoryType } from '../../types';

interface Props {
  categories: CategoryType[];
  onCategorySelect: (categoryId: number) => void;
  showHeader?: boolean;
}

export default function CategoriesList({
  categories,
  onCategorySelect,
  showHeader = true,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(0);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  const allCategories = [{ id: 0, name: 'Browse all' }, ...categories];

  return (
    <Box>
      <Typography
        sx={{
          ml: 1,
          mb: 0.5,
          alignSelf: 'center',
          fontSize: '1rem',
          color: 'black',
          fontFamily: 'inherit',
          fontWeight: 'bold',
          display: showHeader ? 'block' : 'none',
        }}
        variant='h6'>
        Categories
      </Typography>
      <List sx={{ p: 0 }}>
        {allCategories.map((category) => (
          <Category
            key={category.id}
            categoryId={category.id}
            label={category.name}
            isSelected={category.id === selectedCategory}
            onSelect={handleCategorySelect}
          />
        ))}
      </List>
    </Box>
  );
}
