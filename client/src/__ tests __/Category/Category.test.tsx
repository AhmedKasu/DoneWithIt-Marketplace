import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Category from '../../components/Category/Category';

describe('Unselected <Category/>', () => {
  const handleSelect = jest.fn();
  beforeEach(() => {
    render(
      <Category
        label='Electronics'
        categoryId={1}
        onSelect={handleSelect}
        isSelected={false}
      />
    );
  });

  test('Renders the label', () => {
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  test('Renders the correct icon', () => {
    expect(screen.getByTestId('TabletAndroidIcon')).toBeInTheDocument();
  });

  test('Calls onSelect when clicked', async () => {
    await userEvent.click(screen.getByText('Electronics'));
    expect(handleSelect).toHaveBeenCalledWith(1);
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  test('Icon has the correct background color', () => {
    expect(screen.getByTestId('TabletAndroidIcon')).toHaveStyle('color: black');
  });
});

describe('Selected <Category/>', () => {
  const handleSelect = jest.fn();
  beforeEach(() => {
    render(
      <Category
        label='Electronics'
        categoryId={1}
        onSelect={handleSelect}
        isSelected
      />
    );
  });

  test('Icon has the correct background color', () => {
    expect(screen.getByTestId('TabletAndroidIcon')).toHaveStyle('color: white');
  });
});

describe('<Category/> default icon', () => {
  const handleSelect = jest.fn();
  test('Default Icon is rendered when an invalid category is passed', () => {
    render(
      <Category
        label='Electronics'
        categoryId={-5}
        onSelect={handleSelect}
        isSelected={false}
      />
    );
    expect(screen.getByTestId('CategoryIcon')).toBeInTheDocument();
  });
});
