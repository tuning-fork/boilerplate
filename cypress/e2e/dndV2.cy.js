import "@4tw/cypress-drag-drop";

describe("Grant overview DnD", () => {
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

    // #1 -------------------------------------------
    // https://github.com/clauderic/dnd-kit/issues/208
    cy.get('[data-testid="Organization Overview"]').move({
      deltaY: 600,
      force: true,
    });
    // cy.get(".sortable-item")
    //   .first()
    //   .then((res) => {
    //     console.log(res);
    //     // defining the CSS selector for the res handle HTML element
    //     // const resBoundingBox = res.get(0).getBoundingClientRect();
    //     // console.log(res.get(0).getBoundingClientRect());
    //     // console.log(res.get(0));
    //     // const targetSelector = cy.get('[data-testid="Programs"]').getBoundingClientRect());
    //     let targetBoundingBox = {};
    //     cy.get('[data-testid="Programs"]').then((target) => {
    //       targetBoundingBox = target.get(0).getBoundingClientRect();
    //       console.log(targetBoundingBox);
    //       res
    //         .trigger("mousedown")
    //         .trigger("mousemove", {
    //           clientX: targetBoundingBox.x,
    //           clientY: targetBoundingBox.y,
    //         })
    //         .trigger("mouseup");
    //     });
    //   });

    // #2 ----------------------------------------------
    // const dataTransfer = new DataTransfer();
    // let coordsDrop = { x: null, y: null };
    // cy.get('[data-testid="Organization Overview"]').trigger("dragstart", {
    //   dataTransfer,
    // });
    // cy.get('[data-testid="Programs"]')
    //   .then(($target) => {
    //     coordsDrop = $target[0].getBoundingClientRect();
    //   })
    //   .trigger("dragenter", {
    //     clientX: coordsDrop.x,
    //     clientY: coordsDrop.y,
    //     force: true,
    //     dataTransfer,
    //   })
    //   .trigger("dragover", {
    //     clientX: coordsDrop.x,
    //     clientY: coordsDrop.y,
    //     force: true,
    //     dataTransfer,
    //   })
    //   .trigger("drop", {
    //     clientX: coordsDrop.x,
    //     clientY: coordsDrop.y,
    //     force: true,
    //     dataTransfer,
    //   })
    //   // .wait(50)
    //   .trigger("dragend", { force: true });

    // #3 ---------------------------------------
    // https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/testing-dom__drag-drop/cypress/e2e/drag_n_drop_spec.cy.js
    // https://javascript.plainenglish.io/working-with-mouse-actions-in-cypress-e7ef22aa4b89
    // We couldn't figure out how to keep the element selected from mousedown to mousemove -
    // it would 're-select' whatever was in the new location without dragging
    //  This function sets the coordinates for a test move of a dragged draggable object. This is the original:
    // function movePiece(dataId, x, y) {
    //   cy.get(`[data-testid=${dataId}]`)
    //     .trigger("mousedown", { which: 1 })
    //     .trigger("mousemove", { clientX: x, clientY: y })
    //     .trigger("mouseup", { force: true });
    // }
    // We are updating it to work for our draggable sections:
    // function moveSection(testId, xArg, yArg) {
    //   cy.get(`[data-testid=${testId}]`)
    //     .trigger("mousedown", { which: 0 })
    //     .trigger("mousemove", { clientX: xArg, clientY: yArg })
    //     .trigger("mouseup", { force: true });
    // }
    // const location = response.get(0).getBoundingClientRect();
    // cy.get(`[data-testid="Organization Overview"]`)
    //   .trigger("mousedown", "center", {
    //     button: 1,
    //   })
    //   .then((res) => {
    //     res.trigger("mousemove", {
    //       which: 1,
    //       clientX: 90,
    //       clientY: 600,
    //     })
    //     .trigger("mouseup", { force: true });
    // cy.get(".925b9be2-fed8-4d89-a8d9-5204e32866ab")
    //   .trigger("mousedown", { which: 1 })
    //   .trigger("mousemove", {
    //     which: 1,
    //     clientX: 90,
    //     clientY: 600,
    //   })
    //   .trigger("mouseup", { force: true });
    // const location = response.get(0).getBoundingClientRect();
    // const xArg = location.x + 200;
    // const yArg = location.y + 100;

    // #4 ---------------------------------------
    // https://vinayaktitti.medium.com/handling-drag-and-drop-feature-in-cypress-67522f28b7d4
    // const dataTransfer = new DataTransfer();

    // // cy.get(`[data-testid="Organization Overview"]`).trigger("dragstart", {
    // //   dataTransfer,
    // // });
    // //select the element we want to drag and define it as the thing we want to drag
    // //get the location where we want to drag it to and define it as the place we want to drag to/drop
    // //drag
    // //drop
    // cy.get(`[data-testid="Organization Overview"]`).trigger("dragstart", {
    //   dataTransfer,
    // });
    // cy.get(`[data-testid="Programs"]`).trigger("drop", { dataTransfer });
    // cy.get(`[data-testid="Programs"]`).trigger("dragend");
    // // cy.get(draglocator).first().trigger("dragend");

    // #5 ---------------------------------------
    // https://github.com/4teamwork/cypress-drag-drop/blob/master/index.js  move()
    // cy.get(`[data-testid="Organization Overview"]`).trigger("dragstart", {
    //   dataTransfer,
    // });
  });
});
