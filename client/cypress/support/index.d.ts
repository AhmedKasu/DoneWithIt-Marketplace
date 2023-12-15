declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(credentials: { email: string; password: string }): Chainable<unknown>;
  }
}
