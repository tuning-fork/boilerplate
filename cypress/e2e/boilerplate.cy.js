import "@4tw/cypress-drag-drop";

describe("Create a new boilerplate", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Boilerplates"]').click();

    // Create boilerplate

    cy.get("tr").then((res) => {
      const boilerplateCount = res.length;
      cy.get("a:contains('Add New Boilerplate')").click();
      cy.get('[data-testid="boilerplate-dropdown"]').click();

      cy.get("form").within(() => {
        cy.get('[data-testid="General Purpose"]').first().click();
        cy.get('[data-testid="Title"]').type(
          `Test New Boilerplate ${boilerplateCount + 1}`
        );
        cy.get(".ql-editor").type(`This is some new boilerplate text!`);
        cy.get("button[type=submit]").click();
      });

      // Check boilerplate index for the new boilerplate
      cy.get("a:contains('Back to All Boilerplates')").click();
      cy.get("tr")
        .last()
        .within(() => {
          cy.get("td")
            .first()
            .should("contain", `Test New Boilerplate ${boilerplateCount + 1}`);
          cy.get("td").should("have.length", 5);
        });

      // Archive boilerplate
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Archive"]').last().click();
      cy.get("button:contains('Archived')").click();
    });
  });
});

// Test the show page functionality
