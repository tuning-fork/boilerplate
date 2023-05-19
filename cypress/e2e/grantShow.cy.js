describe("View a Grant on the Grants Show page", () => {
  it("Logs into the application", () => {
    cy.viewport(2560, 1600);
    cy.visit("http://localhost:3001");
    cy.intercept("POST", "/api/sessions").as("createSession");
    cy.get('[data-testid="log-in-button"]').click();
    cy.get("input[type=email]").type("abarnes@thecypresstree.org");
    cy.get("input[type=password]").type("password");
    cy.get("button[type=submit]").click();

    // Navigate to the grants index
    cy.wait("@createSession");
    cy.get('[data-testid="The Cypress Tree"]').click();
    cy.get('[data-testid="Grants"]').click();

    // Select grant to view
    cy.intercept("GET", "/api/organizations/**").as("getGrant");
    cy.get("td:contains('Cypress Tree Neighborhood Grant')").first().click();
    // Find grant fields on show page
    cy.wait("@getGrant");
    cy.get("a:contains('Back to All Grants')");
    cy.get("h1:contains('Cypress Tree Neighborhood Grant')");
    cy.get("dt").should("contain", "Funding Organization");
    cy.get("dd").should("contain", "The Hinoki Foundation");
    cy.get("dt").should("contain", "RFP Website");
    cy.get("dd").should(
      "contain",
      "https://thehinokifoundation.org/neighborhood_seed_grants"
    );
    cy.get("dt").should("contain", "Purpose");
    cy.get("dd").should("contain", "general funding");
    cy.get("a[type=button]:contains('Copy')");
    cy.get("a[type=button]:contains('Edit')");
    cy.get("a[type=button]:contains('Overview')");
    cy.get("dt").should("contain", "DEADLINE");
    cy.get("dd").should("contain", "May 15, 2023");
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
    cy.get("h1:contains('Cypress Tree Neighborhood Grant copy')");

    // Edit grant
    cy.get("a[type=button]:contains('Edit')").click();
    cy.get("h1:contains('Edit Grant')");
    cy.get('[data-testid="funding-org-dropdown"]').click();
    cy.get("form").within(() => {
      cy.get('[data-testid="The Arles Fund"]').click();
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
    cy.get("td:contains('Cypress Tree Neighborhood Grant')").first().click();
    cy.get("dd").should("contain", "The Hinoki Foundation");
    cy.get("button:contains('Add Section')").first().click();
    cy.get("form").within(() => {
      cy.get("input").first().type("New Section Title");
      cy.get(".ql-editor").type(`This is a new section!`);
      cy.get("button[type=submit]").click();
    });
    cy.reload();

    // Edit the newly created section
    cy.get("h2:contains('New Section Title')")
      .first()
      .within(() => {
        cy.get("button").first().click();
      });
    cy.get("form").within(() => {
      cy.get("input").first().type(" edited");
      cy.get(".ql-editor").clear().type(`This is the edited section.`);
      cy.get("button[type=submit]").click();
    });
    cy.reload();

    //Paste boilerplate into section
    cy.get("h2:contains('New Section Title')")
      .first()
      .within(() => {
        cy.get("button").first().click();
      });
    cy.get("form").within(() => {
      // Press Paste Boilerplate Content
      cy.get("button:contains('Paste Boilerplate Content')").click();
    });
    cy.get("h2").should("contain", "Paste Boilerplate Content");
    cy.get('[data-testid="Search"]').type(`Ask Us More`);
    cy.get(".accordion-table").within(() => {
      cy.get("li.accordion-item").should("have.length", 1);
    });
    cy.get('[data-testid="Search"]').clear();

    cy.get("button.dropdown__input").click();
    cy.get(".dropdown__menu")
      .last()
      .within(() => {
        cy.get("button:contains('Family Services')").click();
      });
    cy.get(".accordion-item").should("have.length", 2);
    cy.get('[data-testid="Max Word Count"]').type("15");
    cy.get(".accordion-item").should("have.length", 1);
    cy.get("h6.accordion-item__header").click();
    cy.get("button:contains('Paste Boilerplate')").first().click();
    // Confirm that checkmark appears
    cy.get(".paste-boilerplate-text-panel__bottom")
      .children()
      .should("have.length", 2);
    // Then check for the pasted boilerplate inside the form
    cy.get(".ql-editor").should(
      "contain",
      "Ekram Hanna, MIRA Community Engagement Manager, Certified Mental Health First Aid Trainer"
    );
    // Clear search inputs and display all boilerplates
    // cy.get('[data-testid="Max Word Count"]').clear();
    // cy.get(".dropdown__menu").last().clear(); // !!!!!! This won't work because the dropdown can't be cleared. Need all boilerplate option
    // Paste another boilerplate
    // cy.get("h6.accordion-item__header:contains('Mission)").click();
    // Then check for the pasted boilerplate inside the form
    // cy.get(".ql-editor").should(
    //   "contain",
    //   "With the introduction of a new shorter (4 hour) course, MIRA staff"
    // );
    // Text appears multiple times?

    // Cancel/close select and paste boilerplates
    cy.get(".paste-boilerplate-content-popout__close-button").click();
    cy.reload();

    cy.get("h2:contains('New Section Title')")
      .first()
      .within(() => {
        cy.get("button").first().click();
      });

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
    cy.wait(2000);
    cy.get("td:contains('Section To Boilerplate Test')").should("not.exist");

    // Delete the newly added section
    cy.get("a:contains('Grants')").click({ force: true });
    cy.wait(2000);
    cy.get("td:contains('Cypress Tree Neighborhood Grant')").first().click();
    cy.wait(2000);
    cy.get("h2:contains('New Section Title edited')")
      .first()
      .within(() => {
        cy.get("button").first().click();
      });
    cy.get("button:contains('Delete Section')").click();

    // TODO: use create section and edit flow pattern to build add section between sections + cancel edit
    // Add section between sections
    // Cancel edit
  });
});
