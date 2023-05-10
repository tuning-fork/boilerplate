import "@4tw/cypress-drag-drop";

describe("Grant overview DnD", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get('[data-testid="Grant to Test Drag and Drop"]').click();
    cy.get('[data-testid="overview"]').click();

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
    cy.get('[data-testid="Section #1"]').move({
      deltaY: 600,
      force: true,
    });

    // Save and check that all buttons are disabled

    // Drag another section, hit Undo and check that Save and Undo are disabled and Redo is enabled

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
