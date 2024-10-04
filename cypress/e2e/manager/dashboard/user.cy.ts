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

  it("user 아이디 및 PDF 파일명에 prefix로 붙을 텍스트를 설정할 수 있다.", () => {
    cy.intercept("GET", `${Cypress.env("API_VERSION")}/text`).as(
      "getTextRequest"
    );

    cy.get('[data-testid="text-action-button"]').click();

    cy.wait("@getTextRequest").then((interception) => {
      expect(interception.response.statusCode).equal(200);

      // NOTE: 텍스트 GET API 정상 동작 확인 후 텍스트 변경
      cy.get('[data-testid="text-action-modal"]').find("input").clear();
      cy.get('[data-testid="text-action-modal"]').find("input").type("TEST");
      cy.get('[data-testid="text-action-modal"]')
        .find('button[type="submit"]')
        .click();

      // NOTE: 설정 텍스트 변경 성공 모달 닫기
      cy.get('.MuiDialog-paper[role="dialog"]').find("button").click();

      // NOTE: 정상적으로 변경되었는지 확인
      cy.get('[data-testid="text-action-button"]').click();

      cy.wait("@getTextRequest").then((interception) => {
        expect(interception.response.statusCode).equal(200);
        expect(interception.response.body.text).equal("TEST");

        cy.get('[data-testid="text-action-modal"]')
          .find("input")
          .should("have.value", "TEST");
      });
    });
  });
});
