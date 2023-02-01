describe("Splashpage", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com", {
      delay: 100,
    });
    cy.get("input[type=password]").type("password", {
      delay: 100,
    });
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get('[data-testid="Good Place Neighborhood Grant"]').click();
    cy.get('[data-testid="overview"]').click();
    cy.get('[data-testid="Organization Overview"]')
      .trigger("mousedown", { which: 0 })
      .trigger("mousemove", { clientX: 0, clientY: 100 })
      .trigger("mouseup", { force: true });
  });
});
