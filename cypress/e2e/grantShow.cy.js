describe("View a Grant on the Grants Show page", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("michael@thegoodplace.com");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();

    // Navigate to the grants index
    cy.get('[data-testid="The Good Place"]').click();
    cy.get('[data-testid="Grants"]').click();

    // Select grant to view
    cy.get("td:contains('Grant to Test Drag and Drop')").click();
    // Find grant fields on show page
    cy.get("a:contains('Back to All Grants')");
    cy.get("h1:contains('Grant to Test Drag and Drop')");
    cy.get("dt").should("contain", "Funding Organization");
    cy.get("dd").should("contain", "Funds For All");
    cy.get("dt").should("contain", "RFP Website");
    cy.get("dd").should("contain", "http://www.dndkit.com");
    cy.get("dt").should("contain", "Purpose");
    cy.get("dd").should("contain", "Testing drag and drop functionality");
    cy.get("a[type=button]:contains('Copy')");
    cy.get("a[type=button]:contains('Edit')");
    cy.get("a[type=button]:contains('Overview')");
    cy.get("dt").should("contain", "DEADLINE");
    cy.get("dd").should("contain", "Apr 13, 2023");
    cy.get("b").should("contain", "TOTAL WORD COUNT");

    // Copy
    cy.get("a[type=button]:contains('Copy')").click();
    cy.get("h1:contains('Copy Grant')");
    cy.get("form").within(() => {
      cy.get('[data-testid="Purpose"]')
        .clear()
        .type("To test the copy process");
      cy.get("button:contains('Save')").click();
    });
    cy.get("h1:contains('Grant to Test Drag and Drop copy')");

    // Edit grant
    cy.get("a[type=button]:contains('Edit')").click();
    cy.get("h1:contains('Edit Grant')");
    cy.get('[data-testid="funding-org-dropdown"]').click();
    cy.get("form").within(() => {
      cy.get('[data-testid="The Good Place"]').click();
      cy.get('[data-testid="RFP URL"]')
        .clear()
        .type("http://www.dndkitedit.com");
      cy.get('[data-testid="Deadline"]').type("2023-06-01T12:00:00");
      cy.get('[data-testid="Purpose"]')
        .clear()
        .type("To test the edit process");
      cy.get("button[type=submit]").click();
    });

    // Delete copy
    cy.get("a[type=button]:contains('Edit')").click();
    cy.get("button:contains('Delete Grant')").click();

    // Add section
    cy.wait(2000);
    cy.get("h1:contains('All Grants')");
    cy.get("td:contains('Grant to Test Drag and Drop')").click();
    cy.get("dd").should("contain", "Funds For All");
    cy.get("button:contains('Add Section')").first().click();
    cy.get("form").within(() => {
      cy.get("input").first().type("New Section Title");
      cy.get(".ql-editor").type(`This is a new section!`);
      cy.get("button[type=submit]").click();
    });
    cy.reload();

    // Edit the newly created section
    cy.get("h2:contains('New Section Title')").within(() => {
      cy.get("button").first().click();
    });
    cy.get("form").within(() => {
      cy.get("input").first().type(" edited");
      cy.get(".ql-editor").clear().type(`This is the edited section.`);
      cy.get("button[type=submit]").click();
    });
    cy.reload();
    // cy.get("h2:contains('New Section Title')").within(() => {
    //   cy.get("button").first().click();
    // });

    //Paste boilerplate into section
    cy.get("h2:contains('New Section Title')").within(() => {
      cy.get("button").first().click();
    });
    cy.get("form").within(() => {
      // Press Paste Boilerplate Content
      cy.get("button:contains('Paste Boilerplate Content')").click();
      cy.get("h2").should("contain", "Paste Boilerplate Content");
      cy.get('[data-testid="Search"]').type(`mission`);
      cy.get(".accordion-table").within(() => {
        cy.get("li.accordion-item").should("have.length", 4); // should be 1
      });
      cy.get('[data-testid="Search"]').clear();
      cy.get("button.dropdown__input").within(() => {
        cy.get("button:contains('Family Services')").click();
        cy.get("li.accordion-item").should("have.length", 4); // should be 2
      });
      cy.get('[data-testid="Max Word Count"]').type("42");
      cy.get("li.accordion-item").should("have.length", 4); // should be 1
      cy.get("h6.accordion-item__header").click();
      cy.get("button:contains('Paste Boilerplate')").should("be.visible");
      // Then check for paste menu
      // cy.get("input").first().type(" edited");
      // cy.get(".ql-editor").clear().type(`This is the edited section.`);
      // cy.get("button[type=submit]").click();
    });
    cy.reload();
    cy.get("h2:contains('New Section Title')").within(() => {
      cy.get("button").first().click();
    });

    // Open section form
    // Open paste boilerplate content window
    // Select and paste boilerplate
    // Search boilerplates
    // Filter by category
    // Filter by wordcount
    // Expand
    // Expand multiple
    // See Boilerplate text
    // Click on Paste Boilerplate
    // Boilerplate pastes
    // Checkmark appears
    // Paste multiple boilerplates?
    // Text appears multiple times?
    // Type inside new section and save
    // Cancel/close select and paste boilerplates

    // Store section as boilerplate
    cy.get("button:contains('Store Section as Boilerplate')").click();
    cy.wait(2000);
    cy.get("h1:contains('Store Section as Boilerplate')");
    cy.get("form")
      .eq(1)
      .within(() => {
        cy.get("input").first().clear().type("Section To Boilerplate Test");
        cy.get('[data-testid="category-dropdown"]').click();
        cy.get('[data-testid="General Purpose"]').first().click();
        cy.get(".ql-editor")
          .clear()
          .type(`This is the newly created boilerplate text.`);
        cy.get("button[type=submit]").click();
      });

    // Delete the section that was saved as a boilerplate
    cy.get('[data-testid="Boilerplates"]').click();
    cy.get("a:contains('Section To Boilerplate Test')").first().click();
    cy.get("button:contains('Edit')").click();
    cy.get("button:contains('Delete')").click();
    cy.reload();
    cy.get("td:contains('Section To Boilerplate Test')").should("not.exist");

    // Delete the newly added section
    cy.get("a:contains('Grants')").click();
    cy.wait(2000);
    cy.get("td:contains('Grant to Test Drag and Drop')").click();
    cy.wait(2000);
    cy.get("h2:contains('New Section Title edited')").within(() => {
      cy.get("button").first().click();
    });
    cy.get("button:contains('Delete Section')").click();

    // TODO: use create section and edit flow pattern to build add section between sections + cancel edit
    // Add section between sections
    // Cancel edit
  });
});
