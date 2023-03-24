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
      cy.get("input:first").should(
        "have.attr",
        "value",
        "Unique Funding Org Name"
      );
      cy.get("input:last").should(
        "have.attr",
        "value",
        "uniquefundingorgwebsite.org"
      );
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

    // Search
    cy.get('[data-testid="Search Funding Organizations by Title"]').type(
      "Funds for all"
    );
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td").first().should("contain", "Funds For All");
        cy.get("td").should("have.length", 4);
      });
    cy.get('[data-testid="Search Funding Organizations by Title"]').clear();

    // Check archived
    cy.get("button:contains('Archived')").last().click();
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td").first().should("contain", "Test Updated Funding Org");
      });

    // Add new row to send to archive
    cy.get("button:contains('All')").click();
    cy.get("button:contains('Add New Funding Org')").click();
    cy.get("form").within(() => {
      cy.get("input").first().type("Going To Archived");
      cy.get("input").last().type("goingtoarchived.org");
      cy.get("button").last().click();
    });
    cy.reload();
    cy.wait(3000);

    // Send new row to archive from row dropdown menu and check archived
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Archive"]').last().click();
    cy.get("button:contains('Archived')").click();
    cy.get("tr").last().should("contain", "Going To Archived");
  });
});
