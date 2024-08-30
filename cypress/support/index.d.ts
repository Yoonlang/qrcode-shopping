declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<Element>;
    fetchInitialData(): Chainable<string>;
  }
}
