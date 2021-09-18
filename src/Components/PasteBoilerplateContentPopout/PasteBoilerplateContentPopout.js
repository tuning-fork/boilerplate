import React, { useState, useEffect, useContext } from "react";
import TextBox from "../design/TextBox/TextBox";
import "./PasteBoilerplateContentPopout.css";
import { PasteBoilerplateContentPopoutContext } from "./PasteBoilerplateContentPopoutContext";
// import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
// import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";
// import BoilerplatesTable from "./Boilerplates/BoilerplatesTable";

export default function PasteBoilerplateContentPopout() {
  const { pasteBoilerplate } = useContext(PasteBoilerplateContentPopoutContext);

  return (
    <aside className="paste-boilerplate-content-popout">
      <h2 className="heading-3">Paste Boilerplate Content</h2>
      <button onClick={() => pasteBoilerplate("pancake")}>test button</button>
      <TextBox labelText="Search (temp label)" />
      {/* Category will be a dropdown */}
      <TextBox labelText="Category" />
      <TextBox labelText="Max Word Count" />
    </aside>
  );
}

// <heroheader>
// </heroheader>
// <aside />
// <content>
// <content></heroheader>
