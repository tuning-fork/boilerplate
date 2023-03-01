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
    cy.get("button:contains('Add New Category')").click();
    let categoryCount;
    cy.get("tr").then((res) => {
      categoryCount = res.length;
    });
    cy.get("form").within(() => {
      cy.get("button").first().click();
    });
    cy.get("button:contains('Add New Category')").click();
    cy.get("form").within(() => {
      cy.get("input")
        .first()
        .type(`Test New Category Name ${categoryCount + 1}`);
      cy.get("button")
        .last()
        .click()
        .then((res) => {
          cy.get(`tr:contains("Test New Category Name ${categoryCount + 1}")`);
        });
    });
    // console.log(categoryCount);
    // cy.get(`tr:contains("Test New Category Name ${categoryCount + 1}")`);
  });
});
