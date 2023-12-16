import { credentials } from '../helpers';
const testCategories = [
  'Electronics',
  'Clothing',
  'Pet Supplies',
  'Garden & Outdoor',
];

describe('Home page', function () {
  describe('On large screen', function () {
    beforeEach(function () {
      cy.viewport('macbook-13');
      cy.visit('http://localhost:5173');
    });

    describe('Renders page content', function () {
      describe('Renders NavBar', function () {
        it('Renders NavBar container', function () {
          cy.get('.MuiAppBar-root').should('exist');
        });

        describe('App logo/icon', function () {
          it('Is rendered', function () {
            cy.get('[data-testid="RecyclingIcon"]').should('exist');
            cy.contains('DoneWithIt');
          });

          it('Clicking on App logo/icon redirects to Home page', function () {
            cy.visit('http://localhost:5173/signin');
            cy.url().should('include', '/signin');

            cy.get('[data-testid="RecyclingIcon"]').click();
            cy.url().should('not.include', '/signin');
            cy.contains("Today's picks");
          });
        });

        it('Renders UserProfileIcon', function () {
          cy.get('.MuiAvatar-root');
        });
      });

      describe('Renders SideBar', function () {
        describe('SideBar header', () => {
          it('Is rendered', function () {
            cy.get('h2').contains('Marketplace');
          });

          it('Changes to a selected category', function () {
            cy.contains('Electronics').click();
            cy.get('h2').contains('Electronics');
            cy.get('h2').contains('Marketplace').should('not.exist');

            cy.contains('Clothing').click();
            cy.get('h2').contains('Clothing');
            cy.get('h2').contains('Marketplace').should('not.exist');
          });
        });

        it('SearchBar is rendered', function () {
          cy.get('#search-bar').should('exist');
          cy.contains('Search Marketplace');
        });

        it('Renders CreateNewListing button', function () {
          cy.contains('button', '+ Create New Listing');
        });

        it('Renders testCategories', function () {
          testCategories.forEach((category) => {
            cy.contains(category);
          });
        });

        describe('Searching for a listing', function () {
          describe('When a listing is found', function () {
            beforeEach(function () {
              cy.get('#search-bar').type('cat{enter}');
            });

            it('A listing is rendered', function () {
              cy.get('img[alt="Test Ps5"]').should('not.exist');
              cy.contains('€1234').should('not.exist');
              cy.get('img[alt="Test cat tree"]').should('exist');
              cy.contains('€4315').should('exist');
            });

            it('Filters are rendered', function () {
              cy.get('h5').contains('Filters');
              cy.contains('Availability');
              cy.contains('Condition');
              cy.contains('Price');
            });
          });

          describe('When a listing is not found', function () {
            beforeEach(function () {
              cy.get('#search-bar').type('catasas{enter}');
            });

            it('NoListing info is rendered', function () {
              cy.get('h4').contains('No Listings Found!').should('exist');
              cy.contains(
                'Try a new search. Check spelling, change your filters, or try a less specific search term.'
              );
              cy.get('button').contains('Browse Marketplace').should('exist');
            });

            it('Clicking on Browse renders all products', function () {
              cy.get('button').contains('Browse Marketplace').click();

              cy.get('img[alt="Test Ps5"]').should('exist');
              cy.contains('€1234').should('exist');
              cy.get('img[alt="Test cat tree"]').should('exist');
              cy.contains('€4315').should('exist');
            });

            it('Filters are not rendered', function () {
              cy.contains('Filters').should('not.exist');
              cy.contains('Availability').should('not.exist');
              cy.contains('Condition').should('not.exist');
              cy.contains('Price').should('not.exist');
            });
          });
        });

        describe('Clicking on a category', function () {
          it('Clicking on Electronics category shows only electronics', function () {
            cy.contains('Electronics').click();
            cy.get('img[alt="Test Ps5"]').should('exist');
            cy.contains('€1234').should('be.visible');
            cy.get('img[alt="Test cat tree"]').should('not.exist');
            cy.contains('€4315').should('not.exist');
          });

          it('Clicking on Pet Supplies category shows only pet supplies', function () {
            cy.contains('Pet Supplies').click();
            cy.get('img[alt="Test Ps5"]').should('not.exist');
            cy.contains('€1234').should('not.exist');
            cy.get('img[alt="Test cat tree"]').should('exist');
            cy.contains('€4315').should('exist');
          });

          it('Clicking on Browse all shows all listings', function () {
            cy.contains('Pet Supplies').click();

            cy.get('img[alt="Test Ps5"]').should('not.exist');
            cy.contains('€1234').should('not.exist');
            cy.get('img[alt="Test cat tree"]').should('exist');
            cy.contains('€4315').should('exist');

            cy.contains('Browse all').click();

            cy.get('img[alt="Test Ps5"]').should('exist');
            cy.contains('€1234').should('exist');
            cy.get('img[alt="Test cat tree"]').should('exist');
            cy.contains('€4315').should('exist');
          });

          it('Click on a category whith no products renders NoListing info', function () {
            cy.contains('Garden & Outdoor').click();

            cy.get('h4').contains('No Listings Found!').should('exist');
            cy.contains(
              'Try a new search. Check spelling, change your filters, or try a less specific search term.'
            );
            cy.get('button').contains('Browse Marketplace').should('exist');
          });
        });
      });

      describe('Renders main content', function () {
        it('Renders  Header', function () {
          cy.contains("Today's picks");
        });

        it('Renders  listings', function () {
          cy.get('.MuiGrid-root > .MuiGrid-root').should('exist');
          cy.get('img[alt="Test Ps5"]').should('exist');
          cy.contains('€1234');
          cy.get('img[alt="Test cat tree"]').should('exist');
          cy.contains('€4315');
        });
      });

      describe('When not authenticated', function () {
        it('Selling button is not rendered on the SideBar', function () {
          cy.contains('Selling').should('not.exist');
        });

        it('Clicking on CreateNewListing button redirects to SignIn page', function () {
          cy.contains('+ Create New Listing').closest('button').click();

          cy.url().should('include', '/signin');
          cy.contains('Sign in');
          cy.contains('Email');
          cy.contains('Password');
        });

        it('Clicking on a listing redirects to SignIn page', function () {
          cy.get('img[alt="Test Ps5"]').click();

          cy.url().should('include', '/signin');
          cy.contains('Sign in');
          cy.contains('Email');
          cy.contains('Password');
        });

        describe('Clicking on UserAvatar, opens a menu with correct elements', function () {
          beforeEach(function () {
            cy.get(
              '.MuiContainer-root > .MuiBox-root > .MuiButtonBase-root'
            ).click();
          });

          it('Renders current user as Guest', function () {
            cy.contains('Guest').should('be.visible');
          });

          it('Renders Signin button', function () {
            cy.contains('Signin');
            cy.get(':nth-child(1) > .MuiListItemIcon-root').should('exist');
          });

          it('Renders Signup button', function () {
            cy.contains('Signup');
            cy.get(':nth-child(2) > .MuiListItemIcon-root').should('exist');
          });

          describe('Clicking on Signin/Signup button from UserProfileIcon menu', function () {
            it('Clicking on Signin button redirects to SignIn page', function () {
              cy.contains('Signin').click();

              cy.url().should('include', '/signin');
              cy.contains('Email');
              cy.contains('Password');
              cy.contains('Sign in');
            });

            it('Clicking on Signup button redirects to SignUp page', function () {
              cy.contains('Signup').click();

              cy.url().should('include', '/signup');
              cy.contains('First Name');
              cy.contains('Last Name');
              cy.contains('Sign up');
            });
          });
        });
      });

      describe('When authenticated', function () {
        beforeEach(function () {
          cy.login(credentials);
        });

        it('Clicking on CreateNewListing button redirects to CreateListing page', function () {
          cy.contains('+ Create New Listing').closest('button').click();

          cy.url().should('include', '/createListing');
          cy.contains('Item For Sale');
          cy.contains('Add Photos');
          cy.contains('Title');
          cy.contains('Price');
          cy.contains('Description');
        });

        it('Selling button is rendered on the SideBar', function () {
          cy.contains('Selling').should('exist');
        });

        it('Clicking on Selling button redirects to Selling page', function () {
          cy.contains('Selling').click();

          cy.url().should('include', '/me/selling');
          cy.contains('Your listings');
          cy.contains('Test Ps5');
          cy.contains('Test cat tree');
        });

        it('Clicking on a listing redirects to Listing page', function () {
          cy.get('img[alt="Test Ps5"]').click();

          cy.url().should('include', '/products/1');
          cy.contains('Test Ps5');
          cy.contains('Used - Good');
          cy.contains('Seller information');
          cy.contains('This is a test PlayStation 5');
        });
      });
    });
  });
});
