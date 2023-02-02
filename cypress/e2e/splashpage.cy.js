describe("Splashpage", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type(
      "michael@thegoodplace.com" /* {
      delay: 100,
    } */
    );
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Grants"]').click();
    cy.get('[data-testid="Good Place Neighborhood Grant"]').click();
    cy.get('[data-testid="overview"]').click();
    cy.get('[data-testid="Programs"]');
    // cy.get(target)
    //     .then($target => {
    //         let coords = $target[0].getBoundingClientRect();
    // });
    cy.get('[data-testid="Programs"]')
      .then((res) => {
        return res[0].getBoundingClientRect();
      })
      .then((res) => {
        cy.get('[data-testid="Organization Overview"]')
          .trigger("mousedown", { force: true })
          .wait(2000)
          .trigger("mousemove", { clientX: res.x, clientY: res.y, force: true })
          .wait(2000)
          .trigger("mouseup", { force: true });
      });

    // cy.get('[data-testid="Organization Overview"]')
    //   .trigger("mousedown", "topLeft")
    //   // .wait(2000)
    //   .trigger("mousemove", {
    //     // force: true,
    //     clientX: coords[0],
    //     clientY: coords[1],
    //   });
  });
});
