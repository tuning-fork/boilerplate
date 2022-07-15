import React from "react";
import { render } from "./utils/testSupport/testUtils";
import App from "./App";

it.skip("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
