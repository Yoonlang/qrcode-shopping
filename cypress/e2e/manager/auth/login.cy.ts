describe("로그인 테스트", () => {
  beforeEach(() => {
    // NOTE: Manager 페이지 접속
    cy.visit("/manager");

    // NOTE: 로그인에 필요한 element가 화면 상에 존재하는지 확인
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[type="submit"]').should("exist");

    // NOTE: 로그인 API 요청 가로챔
    cy.intercept("POST", `${Cypress.env("API_VERSION")}/login`).as(
      "postLoginRequest"
    );
  });

  it("로그인 성공 시 대시보드로 이동한다.", () => {
    cy.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));

    cy.wait("@postLoginRequest").then((interception) => {
      // NOTE: 상태코드 200을 응답받고 __session 쿠키가 설정됨
      expect(interception.response.statusCode).to.equal(200);
      cy.getCookie("__session").should("exist");

      // NOTE: 대시보드의 초기 데이터를 fetch하고 User 테이블을 볼 수 있음
      cy.fetchInitialData();
      cy.get('[data-cy="user-board"]')
        .find("h3")
        .should("have.text", "user / 전체");
    });
  });

  it("로그인 실패 시 400을 응답 받는다.", () => {
    cy.login("test", "test");

    cy.wait("@postLoginRequest").then((interception) => {
      // NOTE: 상태코드 400을 응답받음
      expect(interception.response.statusCode).to.equal(400);
    });
  });
});
