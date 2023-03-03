import "@4tw/cypress-drag-drop";

describe("Create a new funding org", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Funding Organizations"]').click();

    // Create funding org
    cy.get("button:contains('Add New Funding Org')").click();
    cy.get("form").within(() => {
      cy.get("button").first().click();
    });
    cy.get("button:contains('Add New Funding Org')").click();
    cy.get("form").within(() => {
      cy.get("input").first().type("Unique Funding Org Name");
      cy.get("input").last().type("uniquefundingorgwebsite.org");
      cy.get("button").last().click();
    });

    // Edit funding org
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("input").first().contains("Unique Funding Org Name");
    });
    cy.get("form").within(() => {
      cy.get("input").first().clear();
      cy.get("input").first().type(`Test Updated Funding Org`);
      cy.get("input").last().clear();
      cy.get("input").last().type("testnewfundingorgwebsiteupdated.org");
      cy.get("button[type=submit]").click();
    });

    // Cancel edit
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("button:contains('Cancel')").click();
    });

    // Delete funding org
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("button:contains('Delete')").last().click();
    });
  });
});
