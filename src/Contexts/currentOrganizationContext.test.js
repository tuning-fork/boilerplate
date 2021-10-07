import { render, screen, wait } from "@testing-library/react";
import axios from "axios";
import { useCurrentUserContext } from "./currentUserContext";
import { CurrentOrganizationProvider,
  useCurrentOrganizationContext
} from "./currentOrganizationContext";
import { expect, it } from "@jest/globals";

jest.mock("./currentUserContext");
jest.mock("axios");

describe("currentOrganizationContext", () => {
  let currentState;
  const TestHelper = () => {
    currentState = useCurrentOrganizationContext();
    return null;
  };
  const Component = () => (
    <CurrentOrganizationProvider>
      <TestHelper />
    </CurrentOrganizationProvider>
  );
  beforeEach(() => {
    useCurrentUserContext.mockReturnValue({ currentUserStore: { 
      currentUser: {
        id: 10,
      },
      jwt: "what-is-your-favorite-color",
    }});
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: "org1" },
        { id: 2, name: "org2" },
        { id: 3, name: "org3" },
      ],
    });
    axios.create.mockReturnValue(axios);
  });
  it("renders", () => {
    render(<Component />);
    expect(currentState).toBeTruthy();
  });
});

//assertions on data response: check payload got set, 
//set localstorage, check localstorage
