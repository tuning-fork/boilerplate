import "@4tw/cypress-drag-drop";

describe("Create a new grant from Grants index", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get("tr").then((res) => {
      const grantCount = res.length;

      // Create a grant
      cy.get("a:contains('Add New Grant')").click();
      cy.get('[data-testid="funding-org-dropdown"]').click();
      cy.get("form").within(() => {
        cy.get('[data-testid="Funds For All"]').click();
        cy.get('[data-testid="Title"]').type(
          `Test New Grant Name ${grantCount + 1}`
        );
        cy.get('[data-testid="RFP URL"]').type("https://www.testgrant.com");
        cy.get('[data-testid="Deadline"]').type("2023-01-01T12:00:00");
        cy.get('[data-testid="Purpose"]').type("testing purposes");
        cy.get("button[type=submit]").click();
      });

      // Check for newly created grant in 'All'
      cy.get('[data-testid="Grants"]').click();
      cy.get("tr").then(() => {
        cy.get("tr")
          .last()
          .should("contain", `Test New Grant Name ${grantCount + 1}`);
      });

      // Search for a grant
      cy.get('[data-testid="Search Grants by Title"]').type(
        "Jason Mendoza Guacamole Grant"
      );
      cy.get("tr")
        .last()
        .within(() => {
          cy.get("td").should("contain", "Jason Mendoza Guacamole Grant");
          cy.get("td").should("have.length", 7);
        });
      cy.get('[data-testid="Search Grants by Title"]').clear();

      // Check Drafts for new grant
      cy.get('[data-testid="drafts-button"]').click();
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Mark grant as submitted and check submitted
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Mark as Submitted"]').last().click();
      cy.get('[data-testid="submitted-button"]').click();
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Check that grant is still in All
      cy.get('[data-testid="all-button"]').click();
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Check that grant is not in Drafts
      cy.get('[data-testid="drafts-button"]').click();
      cy.get("tr")
        .last()
        .not("contain", `Test New Grant Name ${grantCount + 1}`);

      // Check that grant is in Submitted
      cy.get('[data-testid="submitted-button"]').click();
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Mark grant as Successful
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Mark as Successful"]').last().click();

      // Check that grant is in Successful
      cy.get('[data-testid="successful-button"]').click();
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Remove from successful and check successful
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Remove from Successful"]').last().click();
      cy.get('[data-testid="successful-button"]').click();
      cy.get("tr")
        .last()
        .not("contain", `Test New Grant Name ${grantCount + 1}`);

      // Remove from submitted and check drafts
      cy.get('[data-testid="submitted-button"]').click();
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Remove from Submitted"]').last().click();
      cy.get('[data-testid="drafts-button"]').click();
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Create a copy of the last grant
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`)
        .then(() => {
          cy.get('[data-testid="drop-down-mini"]').last().click();
          cy.get('[data-testid="Make a Copy"]').last().click();
          cy.get("button:contains('Save')").click();
          cy.get("a:contains('Back to All Grants')").click();
        });

      // Go to All and send the new copy to Archived
      cy.reload();
      cy.wait(3000);
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1} copy`)
        .then(() => {
          cy.get('[data-testid="drop-down-mini"]').last().click();
          cy.get('[data-testid="Archive"]').last().click();
          cy.get('[data-testid="archived-button"]').click();
          cy.get("tr")
            .last()
            .should("contain", `Test New Grant Name ${grantCount + 1} copy`);
        });
    });
  });
});
