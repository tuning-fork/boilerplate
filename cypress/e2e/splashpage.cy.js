describe("Splashpage", () => {
  it("Logs into the application", () => {
    // cy.viewport(2560, 1600);
    // cy.visit("http://localhost:3001");
    // cy.get('[data-testid="log-in-button"]').click();
    // cy.get("input[type=email]").type(
    //   "michael@thegoodplace.com" /* {
    //   delay: 100,
    // } */
    // );
    // cy.get("input[type=password]").type("password");
    // cy.get("button[type=submit]").click();
    // cy.get('[data-testid="The Good Place"]').click();
    // cy.get('[data-testid="Grants"]').click();
    // cy.get('[data-testid="Good Place Neighborhood Grant"]').click();
    // cy.get('[data-testid="overview"]').click();
    // cy.get('[data-testid="overview"]').should("exist");
    // cy.get('[data-testid="Programs"]').should("exist");

    // // Cypress.Commands.add("set_typeCarName", () => {
    // //   return cy.wrap(webnewsite.set_typeCarName()); //return the wrap and use in chain
    // // });

    // // function set_typeCarName() {
    // //   let carName = "CAR 1";
    // //   cy.get("#newSiteCityInput").type(carName);
    // //   cy.log("log1 = " + carName);
    // //   return carName;
    // // }

    // function set_draggable() {
    //   cy.get('[data-testid="Organizations Overview"]');
    // }

    // function set_droppable() {
    //   cy.get('[data-testid="Programs"]');
    // }

    // Cypress.Commands.add("set_draggable", () => {
    //   return cy.wrap(set_draggable()); //return the wrap and use in chain
    // });

    // Cypress.Commands.add("set_droppable", () => {
    //   return cy.wrap(set_droppable()); //return the wrap and use in chain
    // });
    // // const droppable = cy.get('[data-testid="Programs"]')[0]; // Drop over this
    // // const draggable = cy.get('[data-testid="overview"]'); // Pick up this
    // // const droppable = cy.get('[data-testid="Programs"]')[0]; // Drop over this

    // // cy.set_droppable().getBoundingClientRect();
    // cy.set_draggable().dispatchEvent(new MouseEvent("mousedown"));
    // cy.set_draggable().dispatchEvent(
    //   new MouseEvent("mousemove", { clientX: 10, clientY: 0 })
    // );
    // cy.set_draggable().dispatchEvent(
    //   new MouseEvent("mousemove", {
    //     // I had to add (as any here --> maybe this can help solve the issue??)
    //     clientX: coords.left + 10,
    //     clientY: coords.top + 10, // A few extra pixels to get the ordering right
    //   })
    // );
    // cy.set_draggable().dispatchEvent(new MouseEvent("mouseup"));
    // cy.get('[data-testid="Programs"]');
    Cypress.Commands.add(
      "loginGoToOverview",
      {
        prevSubject: false,
      },
      (email, pass) => {
        cy.viewport(2560, 1600);
        cy.visit("http://localhost:3001");
        cy.get('[data-testid="log-in-button"]').click();
        cy.get("input[type=email]").type(
          email /* {
      delay: 100,
    } */
        );
        cy.get("input[type=password]").type(pass);
        cy.get("button[type=submit]").click();
        cy.get('[data-testid="The Good Place"]').click();
        cy.get('[data-testid="Grants"]').click();
        cy.get('[data-testid="Good Place Neighborhood Grant"]').click();
        cy.get('[data-testid="overview"]').click();
      }
    );

    Cypress.Commands.add("dragAndDrop", (subject, target) => {
      Cypress.log({
        name: "DRAGNDROP",
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
          return {
            subject: subject,
            target: target,
          };
        },
      });
      const BUTTON_INDEX = 0;
      const SLOPPY_CLICK_THRESHOLD = 10;
      cy.get(target)
        .first()
        .then(($target) => {
          let coordsDrop = $target[0].getBoundingClientRect();
          cy.get(subject)
            .first()
            .then((subject) => {
              const coordsDrag = subject[0].getBoundingClientRect();
              cy.wrap(subject)
                .trigger("mousedown", {
                  button: BUTTON_INDEX,
                  clientX: coordsDrag.x,
                  clientY: coordsDrag.y,
                  force: true,
                })
                .trigger("mousemove", {
                  button: BUTTON_INDEX,
                  clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                  clientY: coordsDrag.y,
                  force: true,
                });
              cy.get("body")
                .trigger("mousemove", {
                  button: BUTTON_INDEX,
                  clientX: coordsDrop.x,
                  clientY: coordsDrop.y,
                  force: true,
                })
                .trigger("mouseup");
            });
        });
    });

    cy.loginGoToOverview("michael@thegoodplace.com", "password");
    cy.dragAndDrop(
      '[data-testid="Organization Overview"]',
      '[data-testid="Programs"]'
    );

    // // cy.viewport(2560, 1600);
    // // cy.visit("http://localhost:3001");
    // // cy.get('[data-testid="log-in-button"]').click();
    // // cy.get("input[type=email]").type(
    // //   "michael@thegoodplace.com" /* {
    // //   delay: 100,
    // // } */
    // // );
    // // cy.get("input[type=password]").type("password");
    // // cy.get("button[type=submit]").click();
    // // cy.get('[data-testid="The Good Place"]').click();
    // // cy.get('[data-testid="Grants"]').click();
    // // cy.get('[data-testid="Good Place Neighborhood Grant"]').click();
    // // cy.get('[data-testid="overview"]').click();
    // // cy.get('[data-testid="Programs"]');
    // // cy.get(target)
    // //     .then($target => {
    // //         let coords = $target[0].getBoundingClientRect();
    // // });

    // Cypress.Commands.add(
    //   "mouseMoveBy",
    //   {
    //     prevSubject: false,
    //   },
    //   (subject, x, y, delay) => {
    //     cy.wrap(subject, { log: false })
    //       .then((subject) => {
    //         console.log("subject", subject);
    //         const initialRect = subject.get(0).getBoundingClientRect();
    //         // const windowScroll = getDocumentScroll();

    //         return [subject, initialRect /* , windowScroll */];
    //       })
    //       .then(([subject, initialRect]) => {
    //         cy.wrap(subject, { log: true })
    //           .trigger("mousedown", { force: true })
    //           .wait(delay || 0, { log: Boolean(delay) })
    //           .trigger("mousemove", {
    //             force: true,
    //             clientX: Math.floor(
    //               initialRect.left + initialRect.width / 2 + x / 2
    //             ),
    //             clientY: Math.floor(
    //               initialRect.top + initialRect.height / 2 + y / 2
    //             ),
    //           })
    //           .trigger("mousemove", {
    //             force: true,
    //             clientX: Math.floor(
    //               initialRect.left + initialRect.width / 2 + x
    //             ),
    //             clientY: Math.floor(
    //               initialRect.top + initialRect.height / 2 + y
    //             ),
    //           })
    //           .wait(100)
    //           .trigger("mouseup", { force: true })
    //           .wait(250)
    //           .then((subject) => {
    //             const finalRect = subject.get(0).getBoundingClientRect();
    //             // const windowScroll = getDocumentScroll();
    //             // const windowScrollDelta = {
    //             //   x: windowScroll.x - initialWindowScroll.x,
    //             //   y: windowScroll.y - initialWindowScroll.y,
    //             // };

    //             // const delta = {
    //             //   x: Math.round(
    //             //     finalRect.left - initialRect.left - windowScrollDelta.x
    //             //   ),
    //             //   y: Math.round(
    //             //     finalRect.top - initialRect.top - windowScrollDelta.y
    //             //   ),
    //             // };

    //             return { subject, initialRect, finalRect };
    //           });
    //       });
    //   }
    // );

    // Cypress.Commands.addAll({
    //   loginGoToOverview(e, p) {},
    //   mouseMoveBy(a) {},
    // });
    // cy.loginGoToOverview("michael@thegoodplace.com", "password");
    // cy.mouseMoveBy(`[data-testid="Programs"]`);

    // cy.get('[data-testid="Programs"]')
    //   .then((res) => {
    //     return res[0].getBoundingClientRect();
    //   })
    //   .then((res) => {
    //     console.log("res", res);
    //     cy.get('[data-testid="Organization Overview"]')
    //       .trigger("mousedown", { force: true })
    //       // .wait(2000)
    //       // .trigger("mousemove", { clientX: res.x, clientY: res.y, force: true })
    //       .trigger("mousemove", {
    //         clientX: res.x,
    //         clientY: res.y,
    //         force: true,
    //       })
    //       // .wait(2000)
    //       .trigger("mouseup", { force: true });
    //   });

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
