import "@4tw/cypress-drag-drop";

describe("Grant overview DnD", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get(
      '[data-testid="Cypress Tree Overview Drag and Drop Test Grant"]'
    ).click();
    cy.get('[data-testid="overview"]').click();

    cy.intercept("GET", "/api/organizations/**/grants/**").as("getGrant");
    cy.intercept("POST", "/api/organizations/**").as("createGrant");
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
    cy.get("button:contains('Save')").should(
      "not.have.class",
      "button--disabled"
    );
    cy.get("button:contains('Undo')").should(
      "not.have.class",
      "button--disabled"
    );
    cy.get("button:contains('Redo')").should("have.class", "button--disabled");

    // Save and check that all buttons are disabled
    cy.get("button:contains('Save')").click();
    cy.wait("@editGrant");
    cy.get(".sortable-item").should("have.length", 6);
    cy.get(".sortable-item").last().should("contain", "Section 1");
    cy.get("button:contains('Save')").should("have.class", "button--disabled");
    cy.get("button:contains('Undo')").should("have.class", "button--disabled");
    cy.get("button:contains('Redo')").should("have.class", "button--disabled");

    // Drag another section, select Undo and check that Save and Undo are disabled and Redo is enabled
    cy.get('[data-testid="Section 2"]').move({
      deltaY: 400,
      force: true,
    });
    // cy.wait(2000);
    // cy.get("button:contains('Undo')").click();
    // cy.get("button:contains('Save')").should("have.class", "button--disabled");
    // cy.get("button:contains('Undo')").should("have.class", "button--disabled");
    // cy.get("button:contains('Redo')").should(
    //   "not.have.class",
    //   "button--disabled"
    // );

    // Drag a section, select Rndo and check that Save and Uedo is active
    cy.get('[data-testid="Section 4"]').move({
      deltaY: 300,
      force: true,
    });
    // cy.wait(2000);
    // cy.get("button:contains('Redo')").click();
    // cy.get("button:contains('Save')").should(
    //   "not.have.class",
    //   "button--disabled"
    // );
    // cy.get("button:contains('Undo')").should(
    //   "not.have.class",
    //   "button--disabled"
    // );
    // cy.get("button:contains('Redo')").should("have.class", "button--disabled");

    /* Drag remaining sections so that the original order is 
    reversed */
    cy.get('[data-testid="Section 2"]').move({
      deltaY: 400,
      force: true,
    });
    cy.wait(2000);
    cy.get('[data-testid="Section 4"]').move({
      deltaY: 200,
      force: true,
    });
    cy.wait(2000);
    cy.get('[data-testid="Section 5"]').move({
      deltaY: 200,
      force: true,
    });
    cy.wait(2000);

    // Save

    // Grab the sections and check that the order is reversed

    // Select redo and after each selection check that the order is as expected

    // Undo one section
    // Drag and drop one section
    // Save one section
    // Drag and drop multiple sections
    // Drag and drop with reverses
    // Redo action
    // Undo action
    // Redo and Undo chain multiple
    // Save/Redo/Undo buttons disabled
    // Switch back to Grant Show
    // Preview pane shows all text from grant sections
    // Preview pane toggle show title on and off
    // Preview pane updates automatically on drag and drop action
  });
});
