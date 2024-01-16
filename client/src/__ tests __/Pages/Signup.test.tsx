import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../Helpers/RoutesHelpers';
import SignIn from '../../pages/Signin';
import SignUp from '../../pages/Signup';

import useSignup from '../../hooks/auth/useSignup';
import useSignin from '../../hooks/auth/useSignIn';

jest.mock('../../hooks/useSignup', () => jest.fn());
jest.mock('../../hooks/useSignIn', () => jest.fn());

describe('<SignUp />', () => {
  const routes = [{ path: '/signin', element: <SignIn /> }];
  const mockUseSignup = useSignup as jest.Mock;
  const mockUseSignin = useSignin as jest.Mock;

  describe('Renders page content', () => {
    beforeEach(() => {
      mockUseSignup.mockReset();
      mockUseSignup.mockImplementation(() => ({}));
      mockUseSignin.mockImplementation(() => ({}));

      renderWithRouter(<SignUp />, routes);
    });

    test('Renders page title', () => {
      expect(
        screen.getByRole('heading', { name: 'Sign up' })
      ).toBeInTheDocument();
    });

    test('Renders first name input', () => {
      expect(
        screen.getByRole('textbox', { name: 'First Name' })
      ).toBeInTheDocument();
    });

    test('Renders last name input', () => {
      expect(
        screen.getByRole('textbox', { name: 'Last Name' })
      ).toBeInTheDocument();
    });

    test('Renders email input', () => {
      expect(
        screen.getByRole('textbox', { name: /Email Address/i })
      ).toBeInTheDocument();
    });

    test('Renders password input', () => {
      expect(
        screen.getByLabelText(/Password/i, {
          selector: 'input[type="password"]',
        })
      ).toBeInTheDocument();
    });

    test('Renders signin button', () => {
      expect(
        screen.getByRole('button', { name: 'Sign Up' })
      ).toBeInTheDocument();
    });

    test('Renders signin link', () => {
      expect(
        screen.getByRole('link', {
          name: /Already have an account\? sign in/i,
        })
      ).toBeInTheDocument();
    });
  });

  describe('When signin link is clicked', () => {
    beforeEach(() => {
      mockUseSignup.mockReset();
      mockUseSignup.mockImplementation(() => ({}));
      mockUseSignin.mockImplementation(() => ({}));

      renderWithRouter(<SignUp />, routes);
    });

    test('Navigates to signin page', async () => {
      await userEvent.click(
        screen.getByRole('link', {
          name: /Already have an account\? sign in/i,
        })
      );

      expect(
        screen.getByRole('heading', { name: 'Sign in' })
      ).toBeInTheDocument();
    });
  });

  describe('Form validation', () => {
    const mutate = jest.fn();

    beforeEach(() => {
      mockUseSignup.mockReset();
      mockUseSignup.mockImplementation(() => ({
        data: null,
        mutate,
      }));

      renderWithRouter(<SignUp />, routes);
    });

    describe('Submitting empty form', () => {
      test('All fields are validated & error messages are rendered', async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

        expect(screen.getByText('First name is required.')).toBeInTheDocument();
        expect(screen.getByText('Last name is required.')).toBeInTheDocument();
        expect(screen.getByText('Email is required.')).toBeInTheDocument();
        expect(screen.getByText('Password is required.')).toBeInTheDocument();
      });

      test('Handle submit is not called', async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
        expect(mutate).not.toHaveBeenCalled();
      });
    });

    describe('Submitting invalid first name and last name', () => {
      describe('When first name and last name are less than 2 characters', () => {
        test('First name and last name are validated & error messages are rendered', async () => {
          await userEvent.type(
            screen.getByRole('textbox', { name: 'First Name' }),
            'a'
          );
          await userEvent.type(
            screen.getByRole('textbox', { name: 'Last Name' }),
            'b'
          );

          await userEvent.click(
            screen.getByRole('button', { name: 'Sign Up' })
          );

          expect(
            screen.getByText('First name must be at least 2 characters long.')
          ).toBeInTheDocument();

          expect(
            screen.getByText('Last name must be at least 2 characters long.')
          ).toBeInTheDocument();
        });
      });
    });

    describe('When first name and last name are more than 20 characters', () => {
      test('First name and last name are validated & error messages are rendered', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'First Name' }),
          'a'.repeat(21)
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Last Name' }),
          'b'.repeat(21)
        );

        await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

        expect(
          screen.getByText('First name must be at most 20 characters long.')
        ).toBeInTheDocument();

        expect(
          screen.getByText('Last name must be at most 20 characters long.')
        ).toBeInTheDocument();
      });
    });

    describe('When submitting invalid email', () => {
      test('Email is validated & error message is rendered', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: /Email Address/i }),
          'invalidEmail'
        );

        await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));
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
            screen.getByRole('button', { name: 'Sign Up' })
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
            screen.getByRole('button', { name: 'Sign Up' })
          );

          expect(screen.getByText(passwordError)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Submitting a valid form', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'myEmail@email.com',
      password: 'Password1$',
    };
    const name = `${user.firstName} ${user.lastName}`;

    describe('When all fields are valid', () => {
      const mutate = jest.fn();
      beforeEach(() => {
        mockUseSignup.mockReset();
        mockUseSignup.mockImplementation(() => ({ data: null, mutate }));

        renderWithRouter(<SignUp />, routes);
      });

      test('HandleSubmit is called with correct arguments', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'First Name' }),
          user.firstName
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Last Name' }),
          user.lastName
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: /Email Address/i }),
          user.email
        );
        await userEvent.type(
          screen.getByLabelText(/Password/i, {
            selector: 'input[type="password"]',
          }),
          user.password
        );

        await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

        expect(mutate).toHaveBeenCalledWith({
          name,
          email: user.email,
          password: user.password,
        });
      });
    });

    describe('When user is successfully created', () => {
      const mutate = jest.fn();

      beforeEach(() => {
        mockUseSignup.mockReset();
        mockUseSignup.mockImplementation(() => ({
          data: { name },
          error: null,
          mutate,
        }));

        renderWithRouter(<SignUp />, routes);
      });

      test('Success alert message is rendered', async () => {
        const successAlert = screen.getByRole('alert');
        expect(successAlert).toHaveStyle({ color: 'rgb(30, 70, 32)' });

        expect(
          screen.getByText(`User ${name} created successfully!`)
        ).toBeInTheDocument();
      });
    });

    describe('When there is error creating user', () => {
      const mutate = jest.fn();
      const errorMessage = 'Email already exists!';

      beforeEach(() => {
        mockUseSignup.mockReset();
        mockUseSignup.mockImplementation(() => ({
          data: null,
          error: { response: { data: { details: errorMessage } } },
          mutate,
        }));

        renderWithRouter(<SignUp />, routes);
      });

      test('Error message alert is rendered', async () => {
        const errorAlert = screen.getByRole('alert');
        expect(errorAlert).toHaveStyle({ color: 'rgb(95, 33, 32)' });

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
});
