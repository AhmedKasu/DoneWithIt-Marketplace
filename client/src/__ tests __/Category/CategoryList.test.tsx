import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import CategoriesList from '../../components/Category/CategoriesList';
import { Category } from '../../types';

const categories: Category[] = [
  { id: 1, name: 'Clothing' },
  { id: 2, name: 'Entertainment' },
  { id: 3, name: 'Sporting Goods' },
];

const defaultCategory = { id: 0, name: 'Browse all' };

const handleCategorySelect = jest.fn();

describe('<CategoryList/>', () => {
  let container: HTMLElement;
  beforeEach(() => {
    const { container: renderContainer } = render(
      <CategoriesList
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />
    );
    container = renderContainer;
  });

  test('Renders the header by default', () => {
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  test('Renders default category (Browse all)', () => {
    expect(screen.getByText(defaultCategory.name)).toBeInTheDocument();
  });

  test('Calls onCategorySelect with correct param when "Browse all" is clicked', async () => {
    await userEvent.click(screen.getByTestId('StorefrontIcon'));
    expect(handleCategorySelect).toHaveBeenCalledWith(defaultCategory.id);
  });

  test('Renders the correct number of categories', () => {
    expect(container.getElementsByClassName('MuiSvgIcon-root').length).toBe(
      categories.length + 1
    );
  });

  test('Renders the correct labels', () => {
    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  test('Calls onCategorySelect whith correct param when clicked', async () => {
    const category = categories[2];
    await userEvent.click(screen.getByText(category.name));
    expect(handleCategorySelect).toHaveBeenCalledWith(category.id);
  });
});

describe('<CategoryList/> with no header', () => {
  test('Does not render the header', () => {
    render(
      <CategoriesList
        categories={categories}
        onCategorySelect={handleCategorySelect}
        showHeader={false}
      />
    );
    expect(screen.getByText('Categories')).toHaveStyle('display: none');
  });
});
