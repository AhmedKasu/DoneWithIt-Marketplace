import { credentials } from '../helpers';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('/signin');
  });

  describe('Renders form content', () => {
    it('Signin form is rendered', () => {
      cy.get('form').should('be.visible');
    });

    it('Renders the signin form title', () => {
      cy.get('h1').should('have.text', 'Sign in').and('be.visible');
    });

    it('Renders the signin form email input', () => {
      cy.get('#email').should('be.visible');
    });

    it('renders the signin form password input', () => {
      cy.get('#password').should('be.visible');
    });

    it('renders the signin form submit button', () => {
      cy.get('button').should('have.text', 'Sign In').and('be.visible');
    });
  });

  describe('Signin form validation', () => {
    describe('Submiting an empty form', () => {
      it('Should validate all fields and display error messages', () => {
        cy.get('button[type="submit"]').should('have.text', 'Sign In').click();

        cy.checkValidationError('#email-helper-text', 'Email is required');
        cy.checkValidationError(
          '#password-helper-text',
          'Password is required'
        );
      });
    });

    describe('Invalid email', () => {
      it('Should display error message', () => {
        cy.get('#email').type('email');
        cy.get('h1').should('have.text', 'Sign in').click();

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
        cy.get('h1').should('have.text', 'Sign in').click();

        cy.checkValidationError('#password-helper-text', errorMessage);

        cy.get('#password').clear();

        cy.get('#password').type('12345678A');
        cy.get('h1').should('have.text', 'Sign in').click();
        cy.checkValidationError('#password-helper-text', errorMessage);

        cy.get('#password').clear();

        cy.get('#password').type('abcdefghi');
        cy.get('h1').should('have.text', 'Sign in').click();
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

  describe('Sign up link', () => {
    it('Should redirect to signup page', () => {
      cy.contains("Don't have an account? Sign Up").click();
      cy.url().should('include', '/signup');
    });
  });

  describe('Submiting a valid form', () => {
    const invalidCredentialsError = 'Invalid email or password.';

    it('When unregistered email is submitted, a server error is returned', () => {
      cy.get('#email').type('wrongcredentials@gmail.com');
      cy.get('#password').type(credentials.password);
      cy.get('button[type="submit"]').should('have.text', 'Sign In').click();

      cy.checkErrorAlert(invalidCredentialsError);
    });

    it('When unregistered password is submitted, a server error is returned', () => {
      cy.get('#email').type(credentials.email);
      cy.get('#password').type('wrongPassword-1234');
      cy.get('button[type="submit"]').should('have.text', 'Sign In').click();

      cy.checkErrorAlert(invalidCredentialsError);
    });

    it('When valid credentials are submitted, a user successfully signed in and redirected to the home page', () => {
      cy.login(credentials);
      cy.checkSuccessAlert('Successfully logged in!');

      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    });
  });
});
