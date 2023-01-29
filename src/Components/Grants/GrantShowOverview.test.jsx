import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import GrantShowOverview from "./GrantShowOverview";
import OrganizationRoutes from "../../routes/OrganizationRoutes";
import { CurrentOrganizationProvider } from "../../Contexts/currentOrganizationContext";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

// const login = jest.fn();
//   const { getByText } = render(
//     <UserContext.Provider value={{ login }}>
//       <Login />
//     </UserContext.Provider>
//   );

//   const submitButton = getByText('Login');
//   fireEvent.click(submitButton);

//   expect(login).toHaveBeenCalledTimes(1)
// });

describe("grant show overview", () => {
  it("renders Grant Show Overview inside the context provider", () => {
    const { getByText } = render(
      <OrganizationRoutes>
        <CurrentOrganizationProvider params={{ organizationId: 1 }}>
          <DndContext.Provider>
            <GrantShowOverview />
          </DndContext.Provider>
        </CurrentOrganizationProvider>
      </OrganizationRoutes>
    );
    const renderedGrantShow = getByText("GrantShowOverview");
    expect(renderedGrantShow).toBeInTheDocument();
  });
});

// //drag and drop feature:
// //renders all sections as draggable components

// //when a user drags and drops a section:
// //section order changes to reflect new section position
// //reorder history changes to add previous order

// //save
// //when a user hits save:
// //post request is sent to API with current section order

// //undo/redo
// //when a user hits undo:
// //section order reflects the position the reorder index is pointing to in the reorder history array
// //when a user hits redo:
// //section order reflects the position the reorder index is pointing to in the reorder history array

// //preview pane feature:
// //renders preview pane that displays sections as text
// //preview pane displays sections in correct order and number for grantSections
// //when a user drags and drops a section
// //preview pane auto-updates to reflect new section position
// //show/hide title checkbox
// //on load, defaults to not showing section titles
// //when a user clicks the show/hide title checkbox:
// //preview pane shows titles
// //when a user clicks the show/hide title checkbox again:
// //preview pane does not show titles
