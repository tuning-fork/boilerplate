import "@4tw/cypress-drag-drop";

describe("Create a new category", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Categories"]').click();

    // Create category
    cy.get("button:contains('Add New Category')").click();
    cy.get("form").within(() => {
      cy.get("button").first().click();
    });
    cy.get("button:contains('Add New Category')").click();
    cy.get("form").within(() => {
      cy.get("input").first().type("New Unique Category");
      cy.get("button").last().click();
    });

    // Edit category
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("input:first").should("have.attr", "value", "New Unique Category");
    });
    cy.get("form").within(() => {
      cy.get("input").first().clear();
      cy.get("input").first().type(`Test Updated New Unique Category`);
      cy.get("button[type=submit]").click();
    });

    // Cancel edit
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("button:contains('Cancel')").click();
    });

    // Delete category
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("button:contains('Delete Category')").click(); // find the dialog box and select confirm
    });

    // Search
    cy.get('[data-testid="Search Categories by Title"]').type(
      "Save The Whales"
    );
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td").first().should("contain", "Save The Whales");
        cy.get("td").should("have.length", 3);
      });
    cy.get('[data-testid="Search Categories by Title"]').clear();

    // Check archived
    cy.get("button:contains('Archived')").click();
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td")
          .first()
          .should("contain", "Test Updated New Unique Category");
      });

    // Add new row to send to archive
    cy.get("button:contains('All')").click();
    cy.get("button:contains('Add New Category')").click();
    cy.get("form").within(() => {
      cy.get("input").first().type("New Unique Category");
      cy.get("button").last().click();
    });
    cy.reload();
    cy.wait(3000);

    // Send new row to archive from row dropdown menu and check archived
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Archive"]').last().click();
    cy.get("button:contains('Archived')").click();
    cy.get("tr").last().should("contain", "New Unique Category");
  });
});
