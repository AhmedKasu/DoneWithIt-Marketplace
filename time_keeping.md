| Day   | Time(hr) | WorkDone                                                                                                  |
| ----- | -------- | --------------------------------------------------------------------------------------------------------- |
| 20.10 | 2.0      | Set up initial project structure, installed and configured ESLint for code linting.                       |
|       | 1.0      | Integrated Express for server-side setup, established connection to the PostgreSQL database.              |
|       | 1.0      | Installed and set up Sequelize as the ORM, installed Umzug and set up migrations structure.               |
|       | 2.0      | Designed and implemented the first migration for the users table. Tested to ensure data consistency.      |
| 21.10 | 3.0      | Added and tested the migration and model definitions for products and categories.                         |
|       | 2.5      | Configured seeding with Umzug. Added a seed file to initialize default categories in the database.        |
|       | 2.0      | Configured asynchronous error handling middleware for Express & added user input validation.              |
| 22.10 | 2.0      | Implemented user authentication and authorization functionalities.                                        |
|       | 2.0      | Added routes for retrieving the currently authenticated user & all available categor.                     |
| 23.10 | 2.5      | Fixed a few bugs, improved products validation schema, added a route for retreaving all products.         |
| 24.10 | 3.0      | Added posting and fetching a single product route, findById middleware, & custom type definitions.        |
| 25.10 | 4.0      | Added route for upadating a product, deleting a product & getting a single user.                          |
|       | 3.0      | Added more queries, refactored code & fixed bugs, interfaces & types, checkOwner middleware.              |
|       | 2.0      | Added price_history migration & model.                                                                    |
| 26.10 | 2.0      | Added route for updating product status and fetching product based on its status.                         |
| 27.10 | 2.5      | Added more queries for fetching products.                                                                 |
| 28.10 | 1.0      | Initialised a react project & configured eslint.                                                          |
| 30.10 | 4.0      | Added a signup & signin page.                                                                             |
|       | 0.5      | Configure react router & added initial routes.                                                            |
|       | 3.0      | Implemented client signing in & out using react query & Axios.                                            |
| 31.10 | 4.0      | implemented signing in, refactored code & added a navbar.                                                 |
| 01.11 | 2.0      | Added app layout & modified server authentication.                                                        |
| 02.11 | 4.0      | Implemented fetching all products, added ProductCard & Products component.                                |
|       | 1.0      | Modified & refactored component styles & layout.                                                          |
| 03.11 | 1.5      | Implemented fetching all categories, added app custom theme, and refactored type definitions.             |
| 06.11 | 4.0      | Added Categories & CategoriesList components.                                                             |
|       | 4.0      | Added filtering products by categories, modified component's styles, added category selection animation.  |
| 07.11 | 5.0      | Added a search bar, impelemnted searching for products & search bar header.                               |
| 09.11 | 3.0      | Refactored code, added NoListing & TopBar component                                                       |
| 10.11 | 4.0      | Added a SideBar component, create listing responsive button, extended custom theme & modified styles.     |
| 14.11 | 6.0      | Added a cusom image picker, & a CreateListing page.                                                       |
|       | 3.5      | Implemented fetching current user, added private routes, implemented logingout.                           |
|       | 2.0      | Fixed bugs, extended axios config, added current user context.                                            |
| 15.11 | 1.0      | Added user avatar to user profile icon, add photos icon & user avatar conditional rendering.              |
|       | 6.0      | Implemented uploading images to cloud & creating a new listing.                                           |
| 17.11 | 4.0      | Implemented fetching a single product & added a single product page.                                      |
| 20.11 | 1.0      | Modified components styles.                                                                               |
| 21.11 | 3.0      | Implemented fetching a single user, added a user's listing button & page.                                 |
|       | 4.0      | Implemented optimistic updating product status, deleting a product & user feedback.                       |
| 22.11 | 3.0      | Implemented deleting images uploaded to the cloud & progress indicaator animation.                        |
| 23.11 | 1.0      | Handled custom form 'onKeyDown', added a no listing component, & new user email iniqueness check.         |
| 24.11 | 4.0      | Implemented filtering products by price range, & restructured components directory.                       |
| 25.11 | 6.0      | Added CustomSelect component, Implemented filtering products by price, availability, & condition.         |
| 26.11 | 1.0      | Refactored code & Added an Error page to handle route errors.                                             |
| 27.11 | 3.0      | Installed & configured Jest for unit testing & added tests for Category component.                        |
| 28.11 | 4.0      | Added unit tests for CategoryList & ProductCard compponents.                                              |
| 29.11 | 5.0      | Added jest mock & setup files, tests for Products & ProductPage components, ProductPage error handling.   |
| 02.12 | 6.0      | Added unit tests for Signup & Signin pages & added config file for env variables definition.              |
| 03.12 | 0.5      | Refactored code.                                                                                          |
| 04.12 | 4.0      | Configured a deployment piplene & added a linting step. Fixed setting current user state.                 |
| 05.12 | 6.0      | Extended the deplyment pipeline with code testing, production build, deployment & versioning steps.       |
| 06.12 | 3.0      | Modified component styles & implemented health check & rollback on deployment failure.                    |
|       | 3.0      | Added unit tests for Createlisting component.                                                             |
| 07.12 | 3.0      | Added a package.json file at the root of the project & updated the README file.                           |
| 11.12 | 6.0      | Configured a test database, fixed category selection & catgory id state bugs.                             |
| 12.12 | 6.0      | Configured e2e tests with cypress & added tests for the home page.                                        |
| 13.12 | 6.0      | Restructured the deployment pipeline.                                                                     |
| 14.12 | 7.0      | Added & configured test migrations & seed, added e2e tests in the deployment pipeline workflow.           |
| 15.12 | 2.0      | Installed & configured cypress-file-upload, added cyypress test helpers & custom command "login".         |
| 16.12 | 2.0      | Added custom command "checkValidationError", handled "resize observer" error & added a viewport in tests. |
| 18.12 | 6.0      | Added e2e tests for the CreateListing & UserListings pages.                                               |
| 19.12 | 6.0      | Added e2e tests for the Signup & Signin pages.                                                            |
| 20.12 | 4.0      | Enforced environment variables requirenment, fixed failing test in the deployment-pipeline workflow.      |
| total | 290.5    |                                                                                                           |
