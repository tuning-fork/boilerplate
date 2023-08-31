import "@4tw/cypress-drag-drop";

describe("Create a new boilerplate", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.intercept("POST", "/api/sessions").as("createSession");
    cy.get("a:contains('Log In')").click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();

    // Open cypress test organization dashboard
    cy.wait("@createSession");
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Boilerplates"]').click();

    // Create boilerplate
    cy.intercept("POST", "/api/organizations/**").as("createFirstBoilerplate");
    cy.get("tr").then(() => {
      cy.get("a:contains('Add New Boilerplate')").click();
      cy.get('[data-testid="boilerplate-dropdown"]').click();
      cy.get("form").within(() => {
        cy.get('[data-testid="General Purpose"]').first().click();
        cy.get('[data-testid="Title"]').type("New Unique Boilerplate");
        cy.get(".ql-editor").type(`This is some new boilerplate text!`);
        cy.get("button[type=submit]").click();
      });

      // Check boilerplate index for the new boilerplate
      cy.wait("@createFirstBoilerplate");
      cy.intercept("GET", "/api/organizations/**").as("getBoilerplates");
      cy.get("a:contains('Back to All Boilerplates')").click();
      cy.wait("@getBoilerplates");
      cy.get("tr")
        .last()
        .within(() => {
          cy.get("td").should("have.length", 5);
        });
      cy.get("td:contains('New Unique Boilerplate')")
        .first()
        .within(() => {
          cy.get("a").click();
        });

      // Edit boilerplate
      cy.get("button:contains('Edit')").click();
      cy.get("form").within(() => {
        cy.get("input:first").should(
          "have.attr",
          "value",
          "New Unique Boilerplate"
        );
      });
      cy.get("form").within(() => {
        cy.get(".dropdown").within(() => {
          cy.get("button:contains('General Purpose')").first().click();
          cy.get("button:contains('Gender Equality')").first().click();
        });
        cy.get('[data-testid="Title"]').clear();
        cy.get('[data-testid="Title"]').type(
          "Test Updated New Unique Boilerplate"
        );
        cy.get(".ql-editor").clear();
        cy.get(".ql-editor").type(
          `This is some newly edited boilerplate text!`
        );
        cy.intercept("PATCH", "/api/organizations/**").as("updateBoilerplate");
        cy.get("button[type=submit]").click();
      });

      // Check boilerplate index for the new boilerplate
      cy.wait("@updateBoilerplate");
      cy.intercept("GET", "/api/organizations/**").as("getBoilerplates");
      cy.get("a:contains('Back to All Boilerplates')").click();
      cy.wait("@getBoilerplates");
      cy.get("tr")
        .last()
        .within(() => {
          cy.get("td").should("have.length", 5);
        });
      cy.get("td:contains('Test Updated New Unique Boilerplate')")
        .first()
        .within(() => {
          cy.get("a").click();
        });

      // Cancel edit
      cy.get("button:contains('Edit')").click();
      cy.intercept("GET", "/api/organizations/**").as("getBoilerplates");
      cy.get("form").within(() => {
        cy.get("button:contains('Cancel')").click();
      });
      cy.get("a:contains('Back to All Boilerplates')").click();

      // Archive boilerplate
      cy.wait("@getBoilerplates");
      cy.get('[data-testid="drop-down-mini"]').last().click();
      cy.get('[data-testid="Archive"]').last().click();

      // Check archived
      cy.get("button:contains('Archived')").click();
      cy.get("tr")
        .last()
        .within(() => {
          cy.get("td")
            .first()
            .should("contain", "Test Updated New Unique Boilerplate");
        });
    });
  });
});
