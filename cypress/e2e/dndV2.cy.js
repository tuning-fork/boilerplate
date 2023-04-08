import "@4tw/cypress-drag-drop";

describe("Grant overview DnD", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type(
      "michael@thegoodplace.com" /* {
      delay: 100,
    } */
    );
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get('[data-testid="Good Place Neighborhood Grant"]').click();
    cy.get('[data-testid="overview"]').click();

    // #1 -------------------------------------------
  });
});
