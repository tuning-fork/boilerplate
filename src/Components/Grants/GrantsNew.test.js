import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { CurrentOrganizationProvider } from "../../Contexts/currentOrganizationContext";
import GrantsNew from "./GrantsNew";

describe("GrantsNew", () => {
  const history = createMemoryHistory();
  const Component = () => (
    <Router history={history}>
      <CurrentOrganizationProvider>
        <GrantsNew />
      </CurrentOrganizationProvider>
    </Router>
  );

  it("renders", () => {
    render(<Component />);
  });
});
