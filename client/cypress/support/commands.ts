/// <reference types="cypress" />
import 'cypress-file-upload';

Cypress.on(
  'uncaught:exception',
  (err) => !err.message.includes('ResizeObserver loop limit exceeded')
);

Cypress.Commands.add('login', (credentials) => {
  cy.visit('/signin');
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

Cypress.Commands.add('checkSuccessAlert', (successMessage) => {
  let successAlertColor = 'rgb(30, 70, 32)';
  if (Cypress.isBrowser('electron')) {
    successAlertColor = 'rgb(237, 247, 237)';
  }
  cy.get('#success-alert', { timeout: 10000 })
    .scrollIntoView()
    .should('have.text', successMessage)
    .and('be.visible')
    .and('have.css', 'background-color', successAlertColor);
});

Cypress.Commands.add('checkErrorAlert', (errorMessage) => {
  cy.get('#error-alert', { timeout: 10000 })
    .scrollIntoView()
    .should('have.text', errorMessage)
    .and('be.visible')
    .and('have.css', 'background-color', 'rgb(253, 237, 237)');
});
