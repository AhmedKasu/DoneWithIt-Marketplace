import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ProductCard from '../../components/Product/ProductCard';

const product = {
  id: 99,
  title: 'Test Product',
  price: 150,
  imageUrl: 'https://via.placeholder.com/150',
};

describe('ProductCard', () => {
  const handleSelect = jest.fn();
  beforeEach(() => {
    render(
      <ProductCard
        id={product.id}
        title={product.title}
        price={product.price}
        imageUrl={product.imageUrl}
        onSelect={handleSelect}
      />
    );
    handleSelect.mockClear();
  });

  test('renders product title', () => {
    expect(screen.getByText(product.title)).toBeInTheDocument();
  });

  test('renders product price', () => {
    expect(screen.getByText(`€${product.price}`)).toBeInTheDocument();
  });

  test('renders product image', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('renders product image with correct src', () => {
    expect(screen.getByRole('img')).toHaveAttribute('src', product.imageUrl);
  });

  test('renders product image with correct alt', () => {
    expect(screen.getByRole('img')).toHaveAttribute('alt', product.title);
  });

  test('calls onSelect handler when clicked', async () => {
    await userEvent.click(screen.getByRole('button'));
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(product.id);
  });

  test('does not call onSelect handler without click', () => {
    expect(handleSelect).not.toHaveBeenCalled();
  });
});
