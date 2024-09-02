// NOTE: 사용자 정보를 입력하여 로그인하는 커맨드
Cypress.Commands.add("login", (email, password) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// NOTE: 대시보드 초기 데이터를 fetch하는 커맨드
Cypress.Commands.add("fetchInitialData", () => {
  cy.intercept("GET", `${Cypress.env("API_VERSION")}/users`).as(
    "getUsersRequest"
  );
  cy.intercept("GET", `${Cypress.env("API_VERSION")}/products`).as(
    "getProductsRequest"
  );
  cy.intercept("GET", `${Cypress.env("API_VERSION")}/folders`).as(
    "getFoldersRequest"
  );

  cy.wait([
    "@getUsersRequest",
    "@getProductsRequest",
    "@getFoldersRequest",
  ]).then((interceptions) => {
    interceptions.forEach((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});
