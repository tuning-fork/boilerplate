import "@4tw/cypress-drag-drop";

describe("Create a new grant", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    let grantCount;
    cy.get("tr").then((res) => {
      grantCount = res.length;
    });
    cy.get('[data-testid="new-grant-button"]').click();
    cy.get('[data-testid="funding-org-dropdown"]').click();
    cy.get('[data-testid="Funds For All"]').click();
    cy.get('[data-testid="Title"]').type(
      `Test New Category Name ${grantCount + 1}`
    );
    cy.get('[data-testid="RFP URL"]').type("https://www.testgrant.com");
    cy.get('[data-testid="Deadline"]').type("2023-01-01T12:00:00");
    cy.get('[data-testid="Purpose"]').type("testing purposes");
    cy.get("button[type=submit]").click();
  });
});
