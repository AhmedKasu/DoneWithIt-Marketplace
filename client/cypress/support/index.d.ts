declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(credentials: { email: string; password: string }): Chainable<unknown>;

    checkValidationError(
      selector: string,
      errorMessage: string
    ): Chainable<unknown>;

    checkSuccessAlert(
      successMessage: string,
      selector?: string
    ): Chainable<unknown>;

    checkErrorAlert(
      errorMessage: string,
      selector?: string
    ): Chainable<unknown>;
  }
}
