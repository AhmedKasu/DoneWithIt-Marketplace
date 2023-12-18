import { credentials } from '../helpers';

describe('User Listings Page', function () {
  beforeEach(function () {
    cy.viewport('macbook-13');
    cy.login(credentials);
    cy.wait(2000);
    cy.visit('http://localhost:5173/me/selling');
  });

  it("Renders user's listings", function () {
    cy.get('#product-1').contains('Test Ps5').should('be.visible');
    cy.get('#product-1').contains('€123').should('be.visible');
    cy.get('#product-1')
      .contains('This is a test PlayStation')
      .should('be.visible');
    cy.get('#product-1').find('img[alt="Test Ps5"]').should('be.visible');
    cy.get('#product-1')
      .find('button')
      .contains('Mark as sold')
      .should('be.visible');
    cy.get('#product-1').find('#long-button').should('be.visible');
  });

  describe('Listing availability', function () {
    it('When Available listing can be marked as sold', function () {
      cy.get('#product-1-status').should('have.text', '✔ Mark as sold').click();
      cy.contains('Successfully updated product status.').should('be.visible');

      cy.get('#product-1-status').should('have.text', 'Mark as available');
    });

    it('When Sold listing can be marked as available', function () {
      cy.get('#product-1-status')
        .should('have.text', 'Mark as available')
        .click();
      cy.contains('Successfully updated product status.').should('be.visible');

      cy.get('#product-2-status').should('have.text', '✔ Mark as sold');
    });

    describe('More button', function () {
      it('When clicked, more button expands to show mark as pending, view & delete buttons', function () {
        cy.get('#product-1').find('#long-button').click();
        cy.contains('Mark as Pending').should('be.visible');
        cy.contains('View').should('be.visible');
        cy.contains('Delete Listing').should('be.visible');
      });

      it('When not pending, listing can be marked as pending', function () {
        cy.get('#product-1').find('#long-button').click();
        cy.contains('Mark as Pending').should('be.visible').click();

        cy.contains('Successfully updated product status.').should(
          'be.visible'
        );

        cy.get('#product-1').find('#long-button').click();
        cy.contains('Mark as Pending').should('not.exist');
      });

      it('Click on view button redirects to listing page', function () {
        cy.get('#product-1').find('#long-button').click();
        cy.contains('View').should('be.visible').click();

        cy.url().should('include', '/products/1');
      });

      it('Click on delete button deletes listing', function () {
        cy.get('#product-1').find('#long-button').click();
        cy.contains('Delete Listing').should('be.visible').click();

        cy.contains('Successfully deleted product.').should('be.visible');
        cy.get('#product-1').should('not.exist');
      });
    });
  });
});
