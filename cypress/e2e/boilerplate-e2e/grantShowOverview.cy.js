import "@4tw/cypress-drag-drop";

describe("Grant overview DnD", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get("a:contains('Log In')").click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get(
      '[data-testid="Cypress Tree Overview Drag and Drop Test Grant"]'
    ).click();
    cy.get("a:contains('Overview')").click();

    cy.intercept("PATCH", "/api/organizations/**").as("editGrant");

    // Check that the preview panel is visible and has the same number of items
    cy.get(".grants-show-overview__preview-container").within(() => {
      cy.get(".grants-show-overview__preview-text")
        .children()
        .then((res) => {
          cy.get(".grants-show-overview__preview-text")
            .children()
            .should("have.length", res.length);
          // Show Section Title
          cy.get(".checkbox__input").click({ force: true });
          cy.get(".grants-show-overview__preview-title").should(
            "have.length",
            res.length
          );
        });
    });

    // Drag and drop one section and check that Save and Undo are enabled
    cy.get('[data-testid="Section 1"]').move({
      deltaY: 500,
      force: true,
    });
    cy.get(".checkbox__input").click({ force: true });
    cy.get(".grants-show-overview__preview-title").should("have.length", 6);
    cy.get(".grants-show-overview__preview-title")
      .last()
      .should("contain", "Section 1");
    cy.get(".sortable-item").should("have.length", 6);
    cy.get(".sortable-item").last().should("contain", "Section 1");
    cy.get("button:contains('Save')").should("not.have.attr", "data-disabled");
    cy.get("button:contains('Undo')").should(
      "not.have.attr",
      "data-disabled",
      "true"
    );
    cy.get("button:contains('Redo')").should(
      "have.attr",
      "data-disabled",
      "true"
    );

    // Save and check that all buttons are disabled
    cy.get("button:contains('Save')").click();
    cy.wait("@editGrant");
    cy.reload();
    cy.get(".sortable-item").should("have.length", 6);
    cy.get(".sortable-item").last().should("contain", "Section 1");
    cy.get("button:contains('Save')").should(
      "have.attr",
      "data-disabled",
      "true"
    );
    cy.get("button:contains('Undo')").should(
      "have.attr",
      "data-disabled",
      "true"
    );
    cy.get("button:contains('Redo')").should(
      "have.attr",
      "data-disabled",
      "true"
    );

    // Drag another section, click on Undo and check that Save and Undo are disabled and Redo is enabled
    cy.get('[data-testid="Section 2"]').move({
      deltaY: 400,
      force: true,
    });
    cy.get("button:contains('Undo')").click();
    cy.get("button:contains('Save')").should(
      "have.attr",
      "data-disabled",
      "true"
    );
    cy.get("button:contains('Undo')").should(
      "have.attr",
      "data-disabled",
      "true"
    );
    cy.get("button:contains('Redo')").should(
      "not.have.attr",
      "data-disabled",
      "true"
    );

    // Click on Redo and check that Save and Undo are not disabled and Redo is disabled
    cy.get("button:contains('Redo')").click();
    cy.get("button:contains('Save')").should(
      "not.have.attr",
      "data-disabled",
      "true"
    );
    cy.get("button:contains('Undo')").should(
      "not.have.attr",
      "data-disabled",
      "true"
    );
    cy.get("button:contains('Redo')").should(
      "have.attr",
      "data-disabled",
      "true"
    );

    /* Drag remaining sections so that the original order is 
    restored */
    cy.get('[data-testid="Section 2"]').move({
      deltaY: -500,
      force: true,
    });
    cy.get('[data-testid="Section 1"]').move({
      deltaY: -500,
      force: true,
    });
    cy.get(".sortable-item").last().should("contain", "Section 6");
    cy.get(".sortable-item").first().should("contain", "Section 1");
    cy.get("button:contains('Save')").click();
    cy.get(".sortable-item").last().should("contain", "Section 6");
    cy.get(".sortable-item").first().should("contain", "Section 1");
  });
});
