import React from "react";
import CategoryForm from "./CategoryForm";

describe("<CategoryForm />", () => {
  it("renders", () => {
    cy.mount(
      <CategoryForm
        // categories={[
        //   { id: 1, categoryName: "Banana" },
        //   { id: 2, categoryName: "Kumquat" },
        // ]}
        onSubmit={() => {
          console.log("banana");
        }}
      />
    );
    cy.get("label").should("contains.text", "Name");
    cy.get("button").should("contains.text", "Cancel");
    cy.get("button").should("contains.text", "Save");
    cy.get("form").submit();
    cy.get('button[type="submit"]').click();
  });
});
