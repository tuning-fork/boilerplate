import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem/AccordionItem";
import Button from "../Button/Button";
import { jest } from "@jest/globals";

describe("Accordion", () => {
  it("calls a click handler inside a child element", () => {
    const clickHandler = jest.fn();
    render(
      <Accordion>
        <Button onClick={clickHandler}>Click me</Button>
      </Accordion>
    );

    userEvent.click(screen.getByText("Click me"));

    expect(clickHandler).toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("single child - accordion with one item", () => {
  const AccordionItemChild = jest.mock("./accordion-item", () => () => (
    <AccordionItem data-testid="accordion-item" />
  ));
  const SingleChildAccordion = () => (
    <Accordion>
      <AccordionItemChild />
    </Accordion>
  );
  it("renders a single child", () => {
    render(<SingleChildAccordion />);
    expect(screen.getByTestId(/accordion-item/)).toBeInTheDocument();
  });
});

//   describe("multiple children - accordion with items", () => {
//     const childComponent = <AccordionItem />;
//     const MultipleChildrenAccordion = () => (
//       <Accordion>
//         <AccordionItem />
//         <AccordionItem />
//         <AccordionItem />
//         <AccordionItem />
//         <AccordionItem />
//       </Accordion>
//     );
//     it("renders multiple children", () => {
//       render(<MultipleChildrenAccordion />);
//       expect(screen.find(<AccordionItem />)).length.toEqual(5);
//     });

// it("renders first child", () => {
//   render(<MultipleChildrenAccordion />);
//   // test that icon rendered
//   expect(screen.getByText("Accordion icon")).toBeInTheDocument();
// });

// it("renders string child in span", () => {
//   render(<MultipleChildrenAccordion />);
//   const stringChild = screen.getByText("Super great button");

//   expect(stringChild).toBeInTheDocument();

//   // you can use either of the next expect cases to validate that text rendered in a span
//   //need to run toLowerCase because Chrome shows nodeName in allcaps
//   expect(stringChild.nodeName.toLowerCase()).toEqual("span");

//   expect(stringChild).toContainHTML("<span>Super great button</span>");
// });
//   });
// });
