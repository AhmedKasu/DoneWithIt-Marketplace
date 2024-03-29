import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    projectId: 'k8gz1x',
    baseUrl: 'http://localhost:5173',
    specPattern: [
      'cypress/e2e/spec.signup-page.cy.ts',
      'cypress/e2e/spec.signin-page.cy.ts',
      'cypress/e2e/spec.home-page.cy.ts',
      'cypress/e2e/spec.createListing-page.cy.ts',
      'cypress/e2e/spec.userListings-page.cy.ts',
    ],
  },
});
