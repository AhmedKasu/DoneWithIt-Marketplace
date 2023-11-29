import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Product from '../../pages/Product';
import SignIn from '../../pages/Signin';

import renderWithRouter from '../Helpers/RoutesHelpers';
import useGetProduct from '../../hooks/useGetProduct';
import useSignin from '../../hooks/useSignIn';

import { products } from '../Helpers/mockData';
import { capitalizeFirstLetter } from '../../helpers/product';

jest.mock('../../hooks/useGetProduct', () => jest.fn());
jest.mock('../../hooks/useSignIn', () => jest.fn());

const routes = [{ element: <SignIn />, path: '/signin' }];

const product = products[1];

describe('<Product />', () => {
  describe('when hook is loading', () => {
    beforeEach(() => {
      (useGetProduct as jest.Mock).mockImplementation(() => ({
        isLoading: true,
      }));

      (useSignin as jest.Mock).mockImplementation(() => ({}));
      renderWithRouter(<Product />, routes);
    });

    test('renders loading indicator', async () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('when there is data', () => {
    let container: HTMLElement;
    beforeEach(() => {
      (useGetProduct as jest.Mock).mockImplementation(() => ({
        isLoading: false,
        data: product,
      }));

      (useSignin as jest.Mock).mockImplementation(() => ({}));
      const { container: renderContainer } = renderWithRouter(
        <Product />,
        routes
      );
      container = renderContainer;
    });
    test('Product title is rendered', () => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });

    test('Product description is rendered', () => {
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });

    test('Product status is rendered', () => {
      const renderedStatus = capitalizeFirstLetter(product.status);
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText(renderedStatus)).toBeInTheDocument();
    });

    test('Product condition is rendered', () => {
      expect(screen.getByText('Condition')).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });

    test('Product price is rendered', () => {
      expect(screen.getByText(`€${product.price}`)).toBeInTheDocument();
    });

    test('Product seller name is rendered', () => {
      expect(screen.getByText(product.seller.name)).toBeInTheDocument();
    });

    test('Seller register date is rendered', () => {
      expect(screen.getByText('Seller information')).toBeInTheDocument();
      expect(
        screen.getByText(
          `Joined DoneWithIt in ${new Date(
            product?.seller.createdAt as string
          ).getFullYear()}`
        )
      ).toBeInTheDocument();
    });

    describe('All product images are rendered', () => {
      const user = userEvent.setup();
      test('First image', () => {
        expect(
          screen.getByRole('img', { name: product.title + 0 })
        ).toBeInTheDocument();
      });

      test('Second image', async () => {
        await user.click(
          container.getElementsByClassName('slick-arrow slick-next')[0]
        );
        expect(
          screen.getByRole('img', { name: product.title + 1 })
        ).toBeInTheDocument();
      });
    });
  });

  describe('When there is an error', () => {
    beforeEach(() => {
      (useGetProduct as jest.Mock).mockImplementation(() => ({
        isLoading: false,
        isError: true,
      }));

      (useSignin as jest.Mock).mockImplementation(() => ({}));
      renderWithRouter(<Product />, routes);
    });

    test('Renders error message', () => {
      expect(
        screen.getByText('Sorry, an unexpected server error has occurred.')
      ).toBeInTheDocument();
    });
  });
});
