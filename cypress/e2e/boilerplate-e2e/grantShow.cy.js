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

    cy.intercept("GET", "/api/organizations/**/grants").as("getGrant");
    cy.intercept("POST", "/api/organizations/**/grants/**").as("createGrant");
    cy.intercept("PATCH", "/api/organizations/**/grants/**").as("editGrant");
    cy.intercept("POST", "/api/organizations/**/grants/**/sections").as(
      "createSection"
    );
    cy.intercept("PATCH", "/api/organizations/**/grants/**/sections").as(
      "editSection"
    );
    cy.intercept("GET", "/api/organizations/**/boilerplates").as(
      "getBoilerplate"
    );
    cy.intercept("DELETE", "/api/organizations/**/boilerplates/**").as(
      "deleteBoilerplate"
    );

    // Select grant to view
    cy.get("td:contains('Cypress Tree Neighborhood Grant')").first().click();
    // Find grant fields on show page
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
    cy.get("dd").should("contain", "2023");
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
    cy.wait("@createGrant");
    cy.reload();
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
    cy.wait("@editGrant");

    // Delete copy
    cy.get("a[type=button]:contains('Edit')").click();
    cy.get("button:contains('Delete Grant')").click();
    cy.wait("@editGrant");

    // Add section
    cy.get("h1").should((header) => {
      expect(header).to.have.text("All Grants");
    });
    cy.get("td:contains('Cypress Tree Neighborhood Grant')").first().click();
    cy.get("dd").first().should("contain", "The Arles Fund");
    cy.get("button:contains('Add Section')").first().click();
    cy.get("form").within(() => {
      cy.get("input").first().type("New Section Title");
      cy.get(".ql-editor").type(`This is a new section!`);
      cy.get("button[type=submit]").click();
    });
    cy.wait("@createSection");
    cy.wait("@getGrant");
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
    cy.wait("@editGrant");

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

    // Search for a boilerplate in the Paste Boilerplate Content panel
    cy.get('[data-testid="Search"]').type(`Ask Us More`);
    cy.get(".accordion-table").within(() => {
      cy.get("li.accordion-item").should("have.length", 1);
    });
    cy.get('[data-testid="Search"]').clear();

    //Select Boilerplate and Paste Boilerplate
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
    cy.get(".paste-boilerplate-content-popout__close-button").click();

    // Store section as boilerplate
    cy.get("button:contains('Store Section as Boilerplate')").click();
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
    cy.wait("@deleteBoilerplate");
    cy.reload();
    cy.get("tr").last().should("not.contain", "Section To Boilerplate Test");

    // Delete the newly added section
    cy.get("a:contains('Grants')").click();
    cy.wait("@getGrant");
    cy.get("td:contains('Cypress Tree Neighborhood Grant')").first().click();
    cy.get("h2:contains('New Section Title')")
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
