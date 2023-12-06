import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../Helpers/RoutesHelpers';

import useCreateListing from '../../hooks/useCreateListing';
import useGetCategories from '../../hooks/useGetCategories';
import { Category } from '../../types';

import CreateListing from '../../pages/CreateListing';

jest.mock('../../hooks/useCreateListing', () => jest.fn());
jest.mock('../../hooks/useGetCategories', () => jest.fn());

const mockUseCreateListing = useCreateListing as jest.Mock;
const mockUseGetCategories = useGetCategories as jest.Mock;

const mockCategories: Category[] = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Hobbies' },
];

describe('<CreateListing />', () => {
  describe('Renders page content', () => {
    beforeEach(() => {
      mockUseCreateListing.mockReset();
      mockUseGetCategories.mockReset();
      mockUseCreateListing.mockImplementation(() => ({}));
      mockUseGetCategories.mockImplementation(() => ({
        data: mockCategories,
      }));
      renderWithRouter(<CreateListing />);
    });

    test('Renders page title', () => {
      expect(
        screen.getByRole('heading', { name: 'Item For Sale' })
      ).toBeInTheDocument();
    });

    test('Renders image picker', () => {
      const dropZone = screen.getByLabelText('image-picker');
      expect(dropZone).toBeInTheDocument();

      expect(dropZone).toHaveStyle({ border: '1px dashed #cccccc' });

      expect(screen.getByText('Add Photos')).toBeInTheDocument();
      expect(screen.getByText('or drag and drop')).toBeInTheDocument();
    });

    test('Renders title input', () => {
      expect(
        screen.getByRole('textbox', { name: 'Title' })
      ).toBeInTheDocument();
    });

    test('Renders price input', () => {
      expect(
        screen.getByRole('spinbutton', { name: 'Price' })
      ).toBeInTheDocument();
    });

    test('Renders category select with default value', () => {
      const categorySelect = screen.getByRole('combobox', { name: 'Category' });
      const defaultCategory = mockCategories[0].name;

      expect(categorySelect).toBeInTheDocument();
      expect(screen.getByText(defaultCategory)).toBeInTheDocument();
    });

    test('Renders condition select with default value', () => {
      const conditionSelect = screen.getByRole('combobox', {
        name: 'Condition',
      });
      const defaultCondition = 'Used - Good';

      expect(conditionSelect).toBeInTheDocument();
      expect(screen.getByText(defaultCondition)).toBeInTheDocument();
    });

    test('Renders description input', () => {
      expect(
        screen.getByRole('textbox', { name: 'Description' })
      ).toBeInTheDocument();
    });

    test('Renders submit button', () => {
      expect(
        screen.getByRole('button', { name: 'Create Listing' })
      ).toBeInTheDocument();
    });
  });

  describe('Form validation', () => {
    beforeEach(() => {
      mockUseCreateListing.mockReset();
      mockUseGetCategories.mockReset();
      mockUseCreateListing.mockImplementation(() => ({}));
      mockUseGetCategories.mockImplementation(() => ({
        data: mockCategories,
      }));
      renderWithRouter(<CreateListing />);
    });

    describe('Submiting empty form', () => {
      test('All fields are validated & error messages are rendered', async () => {
        await userEvent.click(
          screen.getByRole('button', { name: 'Create Listing' })
        );

        expect(
          screen.getByText('Please provide at least one image.')
        ).toBeInTheDocument();
        expect(screen.getByText('Title is required.')).toBeInTheDocument();
        expect(screen.getByText('Price is required.')).toBeInTheDocument();
      });
    });

    describe('Submitting form with invalid data', () => {
      test('All fields are validated & error messages are rendered', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Title' }),
          'a'
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Description' }),
          'abcdefghi'
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'Create Listing' })
        );

        expect(
          screen.getByText('Please provide at least one image.')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Title should have at least 3 characters.')
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            'Description is too short! Should be at least 10 characters.'
          )
        ).toBeInTheDocument();
      });
    });
  });
});
