import { credentials } from '../helpers';

describe('Signup Page', () => {
  beforeEach(function () {
    cy.viewport('macbook-13');
    cy.visit('/signup');
  });

  describe('Renders form content', () => {
    it(' Signup form is rendered', () => {
      cy.get('form').should('be.visible');
    });

    it('Renders the signup form title', () => {
      cy.get('h1').should('have.text', 'Sign up').and('be.visible');
    });

    it('Renders the signup form firstName & lastName inputs', () => {
      cy.get('#firstName').should('be.visible');
      cy.get('#lastName').should('be.visible');
    });

    it('Renders the signup form email input', () => {
      cy.get('#email').should('be.visible');
    });

    it('renders the signup form password input', () => {
      cy.get('#password').should('be.visible');
    });

    it('renders the signup form submit button', () => {
      cy.get('button').should('have.text', 'Sign Up').and('be.visible');
    });
  });

  describe('Signup form validation', () => {
    describe('Submiting an empty form', () => {
      it('Should validate all fields and display error messages', () => {
        cy.get('button[type="submit"]').should('have.text', 'Sign Up').click();

        cy.checkValidationError(
          '#firstName-helper-text',
          'First name is required'
        );
        cy.checkValidationError(
          '#lastName-helper-text',
          'Last name is required'
        );
        cy.checkValidationError('#email-helper-text', 'Email is required');
        cy.checkValidationError(
          '#password-helper-text',
          'Password is required'
        );
      });
    });

    describe('Invalid first name', () => {
      it('Should display error message', () => {
        cy.get('#firstName').type('a');
        cy.get('h1').should('have.text', 'Sign up').click();

        cy.checkValidationError(
          '#firstName-helper-text',
          'First name must be at least 2 characters'
        );

        cy.get('#firstName').clear();

        cy.get('#firstName').type('a'.repeat(21));
        cy.get('h1').should('have.text', 'Sign up').click();

        cy.checkValidationError(
          '#firstName-helper-text',
          'First name must be at most 20 characters long.'
        );
      });
    });

    describe('Invalid first lastName', () => {
      it('Should display error message', () => {
        cy.get('#lastName').type('a');
        cy.get('h1').should('have.text', 'Sign up').click();

        cy.checkValidationError(
          '#lastName-helper-text',
          'Last name must be at least 2 characters'
        );

        cy.get('#lastName').clear();
        cy.get('#lastName').type('a'.repeat(21));
        cy.get('h1').should('have.text', 'Sign up').click();

        cy.checkValidationError(
          '#lastName-helper-text',
          'Last name must be at most 20 characters long.'
        );
      });
    });

    describe('Invalid email', () => {
      it('Should display error message', () => {
        cy.get('#email').type('email');
        cy.get('h1').should('have.text', 'Sign up').click();

        cy.checkValidationError(
          '#email-helper-text',
          'Please enter a valid email.'
        );
      });
    });

    describe('Invalid password', () => {
      const errorMessage =
        'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character.';

      it('Should display error message', () => {
        cy.get('#password').type('12345678');
        cy.get('h1').should('have.text', 'Sign up').click();

        cy.checkValidationError('#password-helper-text', errorMessage);

        cy.get('#password').clear();

        cy.get('#password').type('12345678A');
        cy.get('h1').should('have.text', 'Sign up').click();
        cy.checkValidationError('#password-helper-text', errorMessage);

        cy.get('#password').clear();

        cy.get('#password').type('abcdefghi');
        cy.get('h1').should('have.text', 'Sign up').click();
        cy.checkValidationError('#password-helper-text', errorMessage);
      });
    });
  });

  describe('Show/hide password', () => {
    it('Should show password when show password button is clicked', () => {
      cy.get('#password').should('have.attr', 'type', 'password');
      cy.get('#password').type('Test1234!');
      cy.get('[aria-label="toggle password visibility"]').click();
      cy.get('#password').should('have.attr', 'type', 'text');
    });
  });

  describe('Sign in link', () => {
    it('Should redirect to signin page', () => {
      cy.contains('Already have an account? Sign in').click();
      cy.url().should('include', '/signin');
    });
  });

  describe('Submiting a valid form', () => {
    it('When email is not unique, a new user is not created', () => {
      cy.get('#firstName').type('Test');
      cy.get('#lastName').type('User');
      cy.get('#email').type(credentials.email);
      cy.get('#password').type(credentials.password);
      cy.get('button[type="submit"]').should('have.text', 'Sign Up').click();

      cy.checkErrorAlert(
        'An account with the given email already exists. Try logging in instead.'
      );
    });

    it('When all fields are valid, a new user is created', () => {
      cy.get('#firstName').type('Test');
      cy.get('#lastName').type('User');
      cy.get('#email').type('testuser@gmail.com');
      cy.get('#password').type('Test1234!');
      cy.get('button[type="submit"]').should('have.text', 'Sign Up').click();

      cy.checkSuccessAlert('User Test User created successfully!');
    });
  });
});
