import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Container from "./Container";
import Button from "../Button/Button";

describe("Container", () => {
  it("*temporary* calls a click handler inside a child component", () => {
    const clickHandler = jest.fn();
    render(
      <Container>
        <Button onClick={clickHandler}>Click me</Button>
      </Container>
    );

    userEvent.click(screen.getByText("Click me"));

    expect(clickHandler).toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  describe("single child", () => {
    it("renders a single child", () => {
      render(<Container>World's best container</Container>);

      expect(screen.getByText("World's best container")).toBeInTheDocument();
    });
  });

  describe("multiple children", () => {
    const MultipleChildrenContainer = () => (
      <Container>
        <h1>Container Heading Text</h1>
        <span>World's best container</span>
      </Container>
    );

    it("renders first child", () => {
      render(<MultipleChildrenContainer />);
      // test that header rendered
      expect(screen.getByText("Container Heading Text")).toBeInTheDocument();
    });

    it("renders string child in span", () => {
      render(<MultipleChildrenContainer />);
      const stringChild = screen.getByText("World's best container");

      expect(stringChild).toBeInTheDocument();

      // you can use either of the next expect cases to validate that text rendered in a span
      //need to run toLowerCase because Chrome shows nodeName in allcaps
      expect(stringChild.nodeName.toLowerCase()).toEqual("span");

      expect(stringChild).toContainHTML("<span>World's best container</span>");
    });
  });
});
