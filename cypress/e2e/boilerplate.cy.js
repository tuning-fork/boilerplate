import "@4tw/cypress-drag-drop";

describe("Create a new boilerplate", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Boilerplates"]').click();
    cy.get("button:contains('Add New Boilerplate')").click();
    let boilerplateCount;
    cy.get("tr").then((res) => {
      boilerplateCount = res.length;
    });
    cy.get("form").within(() => {
      cy.get("button").first().click();
    });
    cy.get("button:contains('Add New Boilerplate')").click();
    cy.get("form").within(() => {
      cy.get("input")
        .first()
        .type(`Test New Category Name ${boilerplateCount + 1}`);
      cy.get("button").last().click();
    });
  });
});
