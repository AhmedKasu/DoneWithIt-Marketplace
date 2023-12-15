/// <reference types="cypress" />
import 'cypress-file-upload';

Cypress.Commands.add('login', (credentials) => {
  cy.visit('http://localhost:5173/signin');
  cy.get('#email').type(credentials.email);
  cy.get('#password').type(credentials.password);
  cy.get('button').contains('Sign In').click();
});
