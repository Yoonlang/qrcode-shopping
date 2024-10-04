describe("User 대시보드 테스트", () => {
  beforeEach(() => {
    // NOTE: 세션 캐싱
    cy.session("userSession", () => {
      // NOTE: Manager 페이지 접속
      cy.visit("/manager");

      // NOTE: 로그인
      cy.intercept("POST", `${Cypress.env("API_VERSION")}/login`).as(
        "postLoginRequest"
      );

      cy.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));

      cy.wait("@postLoginRequest").then((interception) => {
        expect(interception.response?.statusCode).to.equal(200);
        cy.getCookie("__session").should("exist");

        // NOTE: 대시보드 초기 데이터 fetch
        cy.fetchInitialData();
      });
    });

    cy.visit("/manager");

    // NOTE: user/전체 메뉴 선택
    cy.get('[data-testid="user-board"]')
      .find("h3")
      .should("have.text", "user / 전체");
  });

  it("행을 클릭하면 해당 user의 상세 정보를 볼 수 있다.", () => {
    cy.get('[data-testid="user-board"]')
      .find('[role="rowgroup"]')
      .find('[role="row"]')
      .first()
      .click();
    cy.get('[data-testid="user-detail-modal"]').should("be.visible");
  });

  it("상세 정보 모달 바깥 부분을 클릭하여 모달을 닫을 수 있다.", () => {
    cy.get(".MuiDataGrid-row").first().click();
    cy.get('[data-testid="user-detail-modal"]').should("be.visible");

    // NOTE: 화면의 왼쪽 상단을 클릭
    cy.get("body").click(0, 0);
    cy.get('[data-testid="user-detail-modal"]').should("not.exist");
  });
});
