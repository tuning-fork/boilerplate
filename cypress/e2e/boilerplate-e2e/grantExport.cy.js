describe("Grant Export modal", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get("a:contains('Log In')").click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get('[data-testid="Cypress Tree Neighborhood Grant"]').click();
    cy.contains("Export").click();

    cy.get(".modal").invoke("prop", "open").should("equal", true);
    cy.contains("Include Title").click();
    cy.get(".modal").find("p:contains('Case Management Program')");
    cy.contains("Exclude Title").click();
    cy.get(".export-editor").should("not.contain", "Case Management Program");
    cy.contains("Close").click();
    cy.get(".modal").should("not.exist");
  });
});
