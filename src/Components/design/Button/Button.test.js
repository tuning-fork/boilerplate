import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("*temporary* calls a click handler", () => {
    const clickHandler = jest.fn();
    render(<Button onClick={clickHandler}>Click me</Button>);

    userEvent.click(screen.getByText("Click me"));

    expect(clickHandler).toHaveBeenCalled();
  });

  describe("single child", () => {
    it("renders a single child", () => {
      render(<Button>Super great button</Button>);

      expect(screen.getByText("Super great button")).toBeInTheDocument();
    });
  });

  describe("multiple children", () => {
    const MultipleChildrenButton = () => (
      <Button>
        <div>Button icon</div>Super great button
      </Button>
    );

    it("renders first child", () => {
      render(<MultipleChildrenButton />);
      // test that icon rendered
      expect(screen.getByText("Button icon")).toBeInTheDocument();
    });

    it("renders string child in span", () => {
      render(<MultipleChildrenButton />);
      const stringChild = screen.getByText("Super great button");

      expect(stringChild).toBeInTheDocument();

      // you can use either of the next expect cases to validate that text rendered in a span
      //need to run toLowerCase because Chrome shows nodeName in allcaps
      expect(stringChild.nodeName.toLowerCase()).toEqual("span");

      expect(stringChild).toContainHTML("<span>Super great button</span>");
    });
  });
});
