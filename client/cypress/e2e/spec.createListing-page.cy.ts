import { credentials, testCategories } from '../helpers';

describe('Create Listing Page', function () {
  beforeEach(function () {
    cy.viewport('macbook-13');
    cy.login(credentials);
    cy.wait(2000);
    cy.visit('/createListing');
  });

  describe('Renders form content', function () {
    it('Create listing form is rendered', function () {
      cy.contains('Item For Sale');
      cy.get('form').should('be.visible');
      cy.get('[aria-label="image-picker"]')
        .should('contain', 'Add Photos')
        .and('be.visible')
        .and('have.css', 'border', '1px dashed rgb(204, 204, 204)');

      cy.get('[aria-label="image-picker"]')
        .should('contain', 'or drag and drop')
        .and('be.visible')
        .and('have.css', 'border', '1px dashed rgb(204, 204, 204)');

      cy.get('#title').should('be.visible');
      cy.get('#price').should('be.visible');
      cy.get('#category').should('be.visible');
      cy.get('#condition').scrollIntoView().should('be.visible');
      cy.get('#description').scrollIntoView().should('be.visible');
      cy.get('button').contains('Create Listing').should('be.visible');
    });

    it('Create listing form has default values for category and condition', function () {
      cy.contains('Electronics').should('be.visible');
      cy.contains('Used - Good').should('be.visible');
    });

    describe('Form validation', function () {
      describe('Submiting an empty form', function () {
        it('Validates the form and renders validation errors', function () {
          cy.get('button')
            .contains('Create Listing')
            .scrollIntoView()
            .should('be.visible')
            .click();

          cy.checkValidationError(
            '#imagePicker-validationError',
            'Please provide at least one image.'
          );
          cy.checkValidationError('#title-helper-text', 'Title is required');
          cy.checkValidationError('#price-helper-text', 'Price is required');
          cy.checkValidationError(
            '#description-helper-text',
            'Description is required'
          );
        });
      });

      describe('Invalid image', function () {
        it('When image is too large, its validated and validation error is rendered', function () {
          cy.get('#picker-input').attachFile('large-test-image.jpg', {
            subjectType: 'drag-n-drop',
          });

          cy.checkValidationError(
            '#imagePicker-rejectionError',
            'A valid image file (png or jpg) must be less than 2MB.'
          );
        });
      });

      describe('Invalid title', function () {
        it('When title is too short, its validated and validation error is rendered', function () {
          cy.get('#title').type('a');
          cy.contains('Item For Sale').click();

          cy.checkValidationError(
            '#title-helper-text',
            'Title should have at least 3 characters.'
          );
        });

        it('When title is too long, its validated and validation error is rendered', function () {
          cy.get('#title').type('a'.repeat(51));
          cy.contains('Item For Sale').click();

          cy.checkValidationError(
            '#title-helper-text',
            'Title should not exceed 50 characters.'
          );
        });
      });

      describe('Invalid price', function () {
        it('When price is too low, its validated and validation error is rendered', function () {
          cy.get('#price').type('0');
          cy.contains('Item For Sale').click();

          cy.checkValidationError(
            '#price-helper-text',
            'Price must be greater than 0'
          );
        });

        it('When price is too high, its validated and validation error is rendered', function () {
          cy.get('#price').type('31000');
          cy.contains('Item For Sale').click();

          cy.checkValidationError(
            '#price-helper-text',
            'Price cannot exceed 30,000'
          );
        });
      });

      describe('Invalid description', function () {
        it('When description is too short, its validated and validation error is rendered', function () {
          cy.get('#description').type('a'.repeat(9));
          cy.contains('Item For Sale').click();

          cy.checkValidationError(
            '#description-helper-text',
            'Description is too short! Should be at least 10 characters.'
          );
        });

        it('When description is too long, its validated and validation error is rendered', function () {
          cy.get('#description').type('a'.repeat(201));
          cy.contains('Item For Sale').click();

          cy.checkValidationError(
            '#description-helper-text',
            'Description is too long! Should not exceed 200 characters.'
          );
        });
      });
    });

    describe('Category Select', function () {
      it('When clicked, it renders a list of categories', function () {
        cy.get('#category').click();

        cy.get('.Mui-selected')
          .contains(testCategories[0])
          .should('be.visible');

        cy.get('[data-value="4"]')
          .contains(testCategories[3])
          .should('be.visible');

        cy.get('[data-value="5"]')
          .contains(testCategories[1])
          .should('be.visible');

        cy.get('[data-value="10"]')
          .contains(testCategories[2])
          .should('be.visible');
      });

      it('A different category can be selected', function () {
        cy.get('#category').should('contain', testCategories[0]);
        cy.get('#category').click();

        cy.get('[data-value="4"]').click();
        cy.get('#category').should('contain', testCategories[3]);
      });
    });

    describe('Condition Select', function () {
      it('When clicked, it renders a list of conditions', function () {
        cy.get('#condition').click();

        cy.get('.Mui-selected').contains('Used - Good').should('be.visible');

        cy.get('[data-value="Used - Fair"]')
          .contains('Used - Fair')
          .should('be.visible');

        cy.get('[data-value="Used - Like New"]')
          .contains('Used - Like New')
          .should('be.visible');

        cy.get('[data-value="New"]').contains('New').should('be.visible');
      });

      it('A different condition can be selected', function () {
        cy.get('#condition').should('contain', 'Used - Good');
        cy.get('#condition').click();

        cy.get('[data-value="Used - Fair"]').click();
        cy.get('#condition').should('contain', 'Used - Fair');
      });
    });
  });

  describe('Creating a listing', function () {
    it('When all fields are valid, a listing is created', function () {
      cy.get('#picker-input').attachFile('test-image.jpg', {
        subjectType: 'drag-n-drop',
      });

      cy.get('#title').type('Test electric scooter');
      cy.get('#price').type('200');

      cy.get('#condition').click();
      cy.get('[data-value="Used - Fair"]').click();

      cy.get('#description')
        .scrollIntoView()
        .type('This is a test electric scooter.');

      cy.get('button').contains('Create Listing').click();

      cy.wait(5000);

      cy.checkSuccessAlert('Listing successfuly created');
    });
  });
});
