describe("Create a new funding org", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get("a:contains('Log In')").click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.intercept("GET", "/api/organizations/**/funding_orgs/").as(
      "getFundingOrg"
    );
    cy.intercept("POST", "/api/organizations/**/funding_orgs/").as(
      "createFundingOrg"
    );
    // Open cypress test organization dashboard
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Funding Organizations"]').click();

    // Check that search finds a funding org that exists
    cy.get('[data-testid="Search Funding Organizations by Title"]').type(
      "The Hinoki Foundation"
    );
    cy.get("tr")
      .last()
      .within(() => {
        cy.get("td").first().should("contain", "The Hinoki Foundation");
      });
    cy.get('[data-testid="Search Funding Organizations by Title"]').clear();

    // Check that search does not find a funding org that does not exist
    cy.get('[data-testid="Search Funding Organizations by Title"]').type(
      "Save the Whales Foundation"
    );
    cy.get(
      "p:contains('There are no funding organizations to display in this tab')"
    );
    cy.get('[data-testid="Search Funding Organizations by Title"]').clear();

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
    cy.wait("@createFundingOrg");
    cy.wait("@getFundingOrg");
    cy.reload();
    cy.get('[data-testid="drop-down-mini"]').should("have.length", 4);
    cy.get("td").should("contain", "Unique Funding Org Name");

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
    cy.intercept("PATCH", "api/organizations/**").as("editFundingOrg");
    cy.get("form").within(() => {
      cy.get("input").first().clear();
      cy.get("input").first().type(`Test Updated Funding Org`);
      cy.get("input").last().clear();
      cy.get("input").last().type("testnewfundingorgwebsiteupdated.org");
      cy.get("button[type=submit]").click();
    });
    cy.wait("@editFundingOrg");
    cy.wait("@getFundingOrg");
    // cy.get("td").should("have.length", 12);
    cy.get("td").should("contain", "Test Updated Funding Org");

    // Cancel edit
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Edit"]').last().click();
    cy.get("form").within(() => {
      cy.get("button:contains('Cancel')").click();
    });
    cy.get("dialog").should("not.exist");

    // Add new row to send to archive
    cy.get("button:contains('All')").click();
    cy.get("button:contains('Add New Funding Org')").click();
    cy.get("form").within(() => {
      cy.get("input").first().type("Going To Archived");
      cy.get("input").last().type("goingtoarchived.org");
      cy.get("button").last().click();
    });
    cy.wait("@createFundingOrg");
    cy.wait("@getFundingOrg");
    cy.get('td:contains("Going To Archived")').should("have.length", 1);

    // Send new row to archive from row dropdown menu and check archived
    cy.get('[data-testid="drop-down-mini"]').last().click();
    cy.get('[data-testid="Archive"]').last().click();
    cy.get("button:contains('Archived')").click();
    cy.wait("@editFundingOrg");
    cy.get('td:contains("Going To Archived")').should("have.length", 1);
  });
});
