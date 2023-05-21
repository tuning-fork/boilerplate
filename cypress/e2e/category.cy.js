import "@4tw/cypress-drag-drop";

describe("Create a new category", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    // cy.intercept("POST", "/api/sessions").as("createSession");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();

    // Open cypress test organization dashboard
    // cy.wait("@createSession");
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Categories"]').click();

    // cy.intercept("POST", "/api/organizations/**").as("createFirstCategory");
    // cy.intercept("PATCH", "/api/organizations/**").as("updateCategory");
    // cy.intercept("GET", "**/categories").as("getCategories");

    // Check that search bar input is there
    cy.get('[data-testid="Search Categories by Title"]');
    // Check that search finds a category that exists
    cy.get('[data-testid="Search Categories by Title"]').type("Legal Aid");
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td").first().should("contain", "Legal Aid");
        cy.get("td").should("have.length", 3);
      });
    cy.get('[data-testid="Search Categories by Title"]').clear();

    // Check that search does not find a category that does not exist
    cy.get('[data-testid="Search Categories by Title"]').type(
      "Save the Whales"
    );
    cy.get("p:contains('There are no categories to display in this tab')");
    cy.get('[data-testid="Search Categories by Title"]').clear();

    // Create category
    cy.get("button:contains('Add New Category')").click();
    cy.get("form").within(() => {
      cy.get("button").first().click();
    });
    cy.get("button:contains('Add New Category')").click();
    cy.get("form").within(() => {
      cy.get("input").first().type("New Unique Category First");
      cy.get("button").last().click();
    });

    // Edit category
    // cy.wait("@createFirstCategory");
    // cy.wait("@getCategories");
    cy.reload();
    // cy.get("tr");
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td").should("have.length", 3);
      });
    cy.get("tr").last().should("contain", "New Unique Category First");
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("input:first").should(
        "have.attr",
        "value",
        "New Unique Category First"
      );
    });
    cy.get("form").within(() => {
      cy.get("input").first().clear();
      cy.get("input").first().type(`Test Updated New Unique Category First`);
      cy.get("button[type=submit]").click();
    });

    // Cancel edit
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("button:contains('Cancel')").click();
    });

    //   // Delete category
    // cy.intercept("PATCH", "/api/organizations/**").as("updateCategory");
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("button:contains('Delete Category')").click(); // find the dialog box and select confirm
    });
    cy.reload();

    // Check archived
    cy.get("button:contains('Archived')").click({ force: true });
    //   // cy.wait("@updateCategory");
    //   // cy.wait("@getCategories");
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td")
          .first()
          .should("contain", "Test Updated New Unique Category First");
      });

    // Add new row to send to archive
    // cy.intercept("POST", "/api/organizations/**").as("createSecondCategory");
    cy.get("button:contains('All')").click();
    cy.get("button:contains('Add New Category')").click();
    cy.get("form").within(() => {
      cy.get("input").first().type("New Unique Category Second");
      cy.get("button").last().click();
    });
    cy.reload();
    // cy.wait("@createFirstCategory");
    // cy.get("button:contains('All')").click();
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td").first().should("contain", "New Unique Category Second");
      });

    // Send new row to archive from row dropdown menu and check archived
    // cy.intercept("PATCH", "/api/organizations/**").as("updateCategory");
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Archive"]').last().click({ force: true });
    cy.reload();
    // cy.reload();
    // cy.wait("@updateCategory");
    // cy.wait("@getCategories");
    cy.get("button:contains('Archived')").click();
    // cy.wait("@getCategories");

    cy.get("tr").last().should("contain", "New Unique Category Second");
  });
});
