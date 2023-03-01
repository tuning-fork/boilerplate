import "@4tw/cypress-drag-drop";

describe("Create a new funding org", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Funding Organizations"]').click();
    cy.get("button:contains('Add New Funding Org')").click();
    cy.get("form").within(() => {
      cy.get("button").first().click();
    });
    cy.get("button:contains('Add New Funding Org')").click();
    let fundingOrgCount;
    cy.get("tr").then((res) => {
      fundingOrgCount = res.length;
    });
    cy.get("form").within(() => {
      cy.get("input")
        .first()
        .type(`Test New Funding Org ${fundingOrgCount + 1}`);
      cy.get("input").last().type("testnewfundingorgwebsite.org");
      cy.get("button").last().click();
    });
    // cy.get('[data-testid="funding-org-dropdown"]').click();
    // cy.get('[data-testid="Funds For All"]').click();
    // cy.get('[data-testid="Title"]').type("Test Grant");
    // cy.get('[data-testid="RFP URL"]').type("https://www.testgrant.com");
    // cy.get('[data-testid="Deadline"]').type("2023-01-01T12:00:00");
    // cy.get('[data-testid="Purpose"]').type("testing purposes");
    // cy.get("button[type=submit]").click();
  });
});
