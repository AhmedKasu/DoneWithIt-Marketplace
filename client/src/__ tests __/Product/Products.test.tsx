import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Products from '../../components/Product/Products';
import Product from '../../pages/Product';
import SignIn from '../../pages/Signin';

import renderWithRouter from '../Helpers/RoutesHelpers';
import useGetProduct from '../../hooks/product/useGetProduct';
import useSignin from '../../hooks/auth/useSignIn';

import { products } from '../Helpers/mockData';
import { capitalizeFirstLetter } from '../../helpers/product';

jest.mock('../../hooks/useGetProduct', () => jest.fn());
jest.mock('../../hooks/useSignIn', () => jest.fn());

const clickedProduct = products[1];

describe('<Products />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Products products={products} />
      </MemoryRouter>
    );
  });

  test('renders the header', () => {
    expect(
      screen.getByRole('heading', { name: /today's picks/i })
    ).toBeInTheDocument();
  });

  products.forEach((product) => {
    test(`renders product with title ${product.title}`, () => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`€${product.price}`)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: product.title })).toHaveAttribute(
        'src',
        product.imageUrls[0]
      );
    });
  });
});

describe('<Products /> without header', () => {
  test('does not render the header', () => {
    render(
      <MemoryRouter>
        <Products products={products} showHeader={false} />
      </MemoryRouter>
    );
    expect(
      screen.queryByRole('heading', { name: /today's picks/i })
    ).not.toBeInTheDocument();
  });
});

describe('<Products /> when a product is clicked', () => {
  const routes = [
    { element: <Product />, path: 'products/:id' },
    { element: <SignIn />, path: '/signin' },
  ];

  beforeEach(() => {
    (useGetProduct as jest.Mock).mockImplementation(() => ({
      isLoading: false,
      data: clickedProduct,
    }));

    (useSignin as jest.Mock).mockImplementation(() => ({}));
    renderWithRouter(<Products products={products} />, routes);
  });

  test('useGetProduct hook is called with correct id', async () => {
    await userEvent.click(
      screen.getByRole('img', { name: clickedProduct.title })
    );

    expect(useGetProduct).toHaveBeenCalledWith(clickedProduct.id.toString());
  });

  test('navigates to correct Product page', async () => {
    await userEvent.click(
      screen.getByRole('img', { name: clickedProduct.title })
    );

    const renderedStatus = capitalizeFirstLetter(clickedProduct.status);
    expect(screen.getByText(renderedStatus)).toBeInTheDocument();
    expect(screen.getByText(clickedProduct.condition)).toBeInTheDocument();
    expect(screen.getByText(clickedProduct.description)).toBeInTheDocument();
    expect(screen.getByText(clickedProduct.seller.name)).toBeInTheDocument();
  });
});
