import "@4tw/cypress-drag-drop";

describe("Create a new grant from Grants index", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.intercept("POST", "/api/sessions").as("createSession");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();

    // Open cypress test organization dashboard
    cy.wait("@createSession");
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Grants"]').click();

    cy.intercept("GET", "/api/organizations/**/grants").as("getGrant");
    cy.intercept("POST", "/api/organizations/**").as("createGrant");
    cy.intercept("PATCH", "/api/organizations/**").as("updateGrant");

    cy.get("tr").then((res) => {
      const grantCount = res.length;
      // Create a grant
      cy.get("a:contains('Add New Grant')").click();
      cy.get('[data-testid="funding-org-dropdown"]').click();
      cy.get("form").within(() => {
        cy.get('[data-testid="The Arles Fund"]').click();
        cy.get('[data-testid="Title"]').type(
          `Test New Grant Name ${grantCount + 1}`
        );
        cy.get('[data-testid="RFP URL"]').type("https://www.testgrant.com");
        cy.get('[data-testid="Deadline"]').type("2023-01-01T12:00:00");
        cy.get('[data-testid="Purpose"]').type("testing purposes");
        cy.get("button[type=submit]").click();
      });

      // Check for newly created grant in 'All'
      cy.wait("@createGrant");
      cy.get('[data-testid="Grants"]').click();
      cy.get("tr").then(() => {
        cy.get("tr")
          .last()
          .should("contain", `Test New Grant Name ${grantCount + 1}`);
      });

      // Search for a grant
      cy.get('[data-testid="Search Grants by Title"]').type(
        "Cypress Tree Neighborhood Grant"
      );
      cy.get("tr")
        .last()
        .within(() => {
          cy.get("td").should("contain", "Cypress Tree Neighborhood Grant");
        });
      cy.get('[data-testid="Search Grants by Title"]').clear();

      // Check that search does not find a grant that does not exist
      cy.get('[data-testid="Search Grants by Title"]').type(
        "Cypress Tree Restorative Justice Initiative Grant"
      );
      cy.get("p:contains('There are no grants to display in this tab')");
      cy.get('[data-testid="Search Grants by Title"]').clear();

      // Check Drafts for new grant
      cy.get('[data-testid="drafts-button"]').click();
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Mark grant as submitted and check submitted
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Mark as Submitted"]').last().click();

      // Check that grant is in Submitted
      cy.wait("@updateGrant");
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
      cy.get("td").should(
        "not.contain",
        `Test New Grant Name ${grantCount + 1}`
      );

      // Mark grant as Successful
      cy.get('[data-testid="all-button"]').click();
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Mark as Successful"]').last().click();

      // Check that grant is in Successful
      cy.wait("@updateGrant");
      cy.get('[data-testid="successful-button"]').click();
      cy.get("td").should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Remove from Successful
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Remove from Successful"]').last().click();

      // Check that grant is not in Successful
      cy.wait("@updateGrant");
      cy.get('[data-testid="successful-button"]').click();
      cy.get("td").should(
        "not.contain",
        `Test New Grant Name ${grantCount + 1}`
      );

      // Remove from submitted
      cy.get('[data-testid="submitted-button"]').click();
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Remove from Submitted"]').last().click();

      // // Check that grant is in Drafts
      cy.wait("@updateGrant");
      cy.get('[data-testid="drafts-button"]').click();
      cy.get("td").should("contain", `Test New Grant Name ${grantCount + 1}`);

      // Create a copy of the last grant
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1}`)
        .then(() => {
          cy.get('[data-testid="drop-down-mini"]').last().click();
          cy.get('[data-testid="Make a Copy"]').last().click();
          cy.get("button:contains('Save')").click();
        });
      cy.get("h1:contains('copy')");
      cy.wait("@getGrant");
      // Go to All and send the new copy to Archived
      cy.get("a:contains('Back to All Grants')").click();

      cy.reload(); // TODO: See about removing this reload
      cy.get("h1:contains('All Grants')");
      cy.get("tr").should("have.length.greaterThan", grantCount + 1);
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1} copy`);
      cy.get("tr")
        .last()
        .should("contain", `Test New Grant Name ${grantCount + 1} copy`)
        .then(() => {
          cy.get('[data-testid="drop-down-mini"]').last().click();
          cy.get('[data-testid="Archive"]').last().click();
          cy.get('[data-testid="archived-button"]')
            .click()
            .then(() => {
              cy.get("tr")
                .last()
                .should(
                  "contain",
                  `Test New Grant Name ${grantCount + 1} copy`
                );
            });
        });
    });
  });
});
