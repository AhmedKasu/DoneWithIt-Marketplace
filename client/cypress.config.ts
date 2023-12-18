import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: [
      'cypress/e2e/spec.home-page.cy.ts',
      'cypress/e2e/spec.createListing-page.cy.ts',
      'cypress/e2e/spec.userListings-page.cy.ts',
    ],
  },
});
