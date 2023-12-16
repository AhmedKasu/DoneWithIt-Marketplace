/// <reference types="cypress" />
import 'cypress-file-upload';

Cypress.on(
  'uncaught:exception',
  (err) => !err.message.includes('ResizeObserver loop limit exceeded')
);

Cypress.Commands.add('login', (credentials) => {
  cy.visit('http://localhost:5173/signin');
  cy.wait(2000);
  cy.get('#email').should('not.be.disabled').type(credentials.email);
  cy.get('#password').should('not.be.disabled').type(credentials.password);
  cy.get('button').contains('Sign In').click();
});

Cypress.Commands.add('checkValidationError', (selector, errorMessage) => {
  cy.get(selector)
    .scrollIntoView()
    .should('contain', errorMessage)
    .and('be.visible')
    .and('have.css', 'color', 'rgb(211, 47, 47)');
});
