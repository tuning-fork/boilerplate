import "@4tw/cypress-drag-drop";

describe("Splashpage", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Funding Organizations"]').click();
    cy.get("button[value=Add New Funding Org").click();
    // cy.get('[data-testid="funding-org-dropdown"]').click();
    // cy.get('[data-testid="Funds For All"]').click();
    // cy.get('[data-testid="Title"]').type("Test Grant");
    // cy.get('[data-testid="RFP URL"]').type("https://www.testgrant.com");
    // cy.get('[data-testid="Deadline"]').type("2023-01-01T12:00:00");
    // cy.get('[data-testid="Purpose"]').type("testing purposes");
    // cy.get("button[type=submit]").click();
  });
});
