import React, { useState, useEffect } from "react";
import Input from "./design/Input/Input";
import "./PasteBoilerplateContentPopout.css";
// import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
// import { getAllBoilerplates } from "../Services/Organizations/BoilerplatesService";
// import BoilerplatesTable from "./Boilerplates/BoilerplatesTable";

export default function PasteBoilerplateContentPopout() {
  return (
    <aside className="paste-boilerplate-content-popout">
      <h2 className="heading-3">Paste Boilerplate Content</h2>
      <Input labelText="Search (temp label)" />
      {/* Category will be a dropdown */}
      <Input labelText="Category" />
      <Input labelText="Max Word Count" />
    </aside>
  );
}

// <heroheader>
// </heroheader>
// <aside />
// <content>
// <content></heroheader>
