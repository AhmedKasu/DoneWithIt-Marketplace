import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../Helpers/RoutesHelpers';
import SignIn from '../../pages/Signin';
import SignUp from '../../pages/Signup';

import useSignin from '../../hooks/useSignIn';
import useSignup from '../../hooks/useSignup';

jest.mock('../../hooks/useSignIn', () => jest.fn());
jest.mock('../../hooks/useSignup', () => jest.fn());

describe('<SignIn />', () => {
  const routes = [{ path: '/signup', element: <SignUp /> }];
  const mockUseSignin = useSignin as jest.Mock;
  const mockUseSignup = useSignup as jest.Mock;

  describe('Renders page content', () => {
    beforeEach(() => {
      mockUseSignin.mockReset();
      mockUseSignin.mockImplementation(() => ({}));

      renderWithRouter(<SignIn />, routes);
    });

    test('renders page header', () => {
      expect(
        screen.getByRole('heading', { name: 'Sign in' })
      ).toBeInTheDocument();
    });

    test('renders email input', () => {
      expect(
        screen.getByRole('textbox', { name: /Email Address/i })
      ).toBeInTheDocument();
    });

    test('renders password input', () => {
      expect(
        screen.getByLabelText(/Password/i, {
          selector: 'input[type="password"]',
        })
      ).toBeInTheDocument();
    });

    test('renders signin button', () => {
      expect(
        screen.getByRole('button', { name: 'Sign In' })
      ).toBeInTheDocument();
    });

    test('renders signup link', () => {
      expect(
        screen.getByRole('link', {
          name: /Don't have an account\? sign up/i,
        })
      ).toBeInTheDocument();
    });
  });

  describe('When signup link is clicked', () => {
    beforeEach(() => {
      mockUseSignup.mockReset();
      mockUseSignup.mockImplementation(() => ({}));
      mockUseSignin.mockImplementation(() => ({}));

      renderWithRouter(<SignIn />, routes);
    });

    test('Navigates to signin page', async () => {
      await userEvent.click(
        screen.getByRole('link', {
          name: /Don't have an account\? sign up/i,
        })
      );

      expect(
        screen.getByRole('heading', { name: 'Sign up' })
      ).toBeInTheDocument();
    });
  });

  describe('Form validation', () => {
    const mutate = jest.fn();

    beforeEach(() => {
      mockUseSignin.mockReset();
      mockUseSignin.mockImplementation(() => ({
        data: null,
        mutate,
      }));

      renderWithRouter(<SignIn />, routes);
    });

    describe('Submitting empty form', () => {
      test('All fields are validated & error messages are rendered', async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });

      test('Handle submit is not called', async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
        expect(mutate).not.toHaveBeenCalled();
      });
    });

    describe('When submitting invalid email', () => {
      test('Email is validated & error message is rendered', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: /Email Address/i }),
          'invalidEmail'
        );

        await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
        expect(
          screen.getByText('Please enter a valid email.')
        ).toBeInTheDocument();
      });
    });

    describe('When submitting invalid password', () => {
      const passwordError =
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.';

      describe('When password is less than 8 characters', () => {
        test('Password is validated & error message is rendered', async () => {
          await userEvent.type(
            screen.getByLabelText(/Password/i, {
              selector: 'input[type="password"]',
            }),
            'Pass1$'
          );

          await userEvent.click(
            screen.getByRole('button', { name: 'Sign In' })
          );

          expect(screen.getByText(passwordError)).toBeInTheDocument();
        });
      });

      describe('When password does not contain mixture of lower & upper cases and numbers', () => {
        test('Password is validated & error message is rendered', async () => {
          await userEvent.type(
            screen.getByLabelText(/Password/i, {
              selector: 'input[type="password"]',
            }),
            'password'
          );

          await userEvent.click(
            screen.getByRole('button', { name: 'Sign In' })
          );

          expect(screen.getByText(passwordError)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Submitting a valid form', () => {
    const credentials = {
      email: 'the12Email@email.com',
      password: 'Password122$',
    };

    describe('When all fields are valid', () => {
      const mutate = jest.fn();
      beforeEach(() => {
        mockUseSignin.mockReset();
        mockUseSignin.mockImplementation(() => ({ data: null, mutate }));

        renderWithRouter(<SignIn />, routes);
      });

      test('HandleSubmit is called with correct arguments', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: /Email Address/i }),
          credentials.email
        );
        await userEvent.type(
          screen.getByLabelText(/Password/i, {
            selector: 'input[type="password"]',
          }),
          credentials.password
        );

        await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

        expect(mutate).toHaveBeenCalledWith({
          email: credentials.email,
          password: credentials.password,
        });
      });
    });

    describe('When user is successfully signed in', () => {
      const mutate = jest.fn();
      const name = 'John Doe';

      beforeEach(() => {
        mockUseSignin.mockReset();
        mockUseSignin.mockImplementation(() => ({
          data: { name },
          error: null,
          mutate,
        }));

        renderWithRouter(<SignIn />, routes);
      });

      test('Success alert message is rendered', async () => {
        const successAlert = screen.getByRole('alert');
        expect(successAlert).toHaveStyle({ color: 'rgb(30, 70, 32)' });

        expect(screen.getByText(`Successfully logged in!`)).toBeInTheDocument();
      });
    });

    describe('When there is error signing in', () => {
      const mutate = jest.fn();
      const errorMessage = 'Invalid email or password.';

      beforeEach(() => {
        mockUseSignin.mockReset();
        mockUseSignin.mockImplementation(() => ({
          data: null,
          error: { response: { data: { details: errorMessage } } },
          mutate,
        }));

        renderWithRouter(<SignIn />, routes);
      });

      test('Error alert message is rendered', async () => {
        const errorAlert = screen.getByRole('alert');
        expect(errorAlert).toHaveStyle({ color: 'rgb(95, 33, 32)' });

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
});
