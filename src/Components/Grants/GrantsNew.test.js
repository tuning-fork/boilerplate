import { render, screen, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import {
  CurrentOrganizationProvider,
  useCurrentOrganizationContext,
} from "../../Contexts/currentOrganizationContext";
import { useCurrentUserContext } from "../../Contexts/currentUserContext";
import { createGrant } from "../../Services/Organizations/GrantsService";
import GrantsNew from "./GrantsNew";
import axios from "axios";

jest.mock("axios");
// jest.mock("../../Contexts/currentUserContext");
jest.mock("../../Contexts/currentOrganizationContext");
jest.mock("../../Services/Organizations/GrantsService", () => ({
  createGrant: jest.fn(),
}));
jest.mock("../FundingOrgs/FundingOrgsNew", () => ({
  __esModule: true,
  default: ({ onClose, show }) =>
    show ? (
      <button onClick={() => onClose("10")}>Save New Funding Org</button>
    ) : null,
}));

const baseResponse = {
  data: [
    { id: "1", name: "org1" },
    { id: "2", name: "org2" },
    { id: "3", name: "org3" },
  ],
};

describe("GrantsNew", () => {
  const history = createMemoryHistory();
  const getTextBoxInput = (text) =>
    screen.getByText(text).nextSibling.querySelector("input");

  //   const ConditionalGrantsNew = () => {
  //     const { currentOrganizationStore, organizationClient } =
  //       useCurrentOrganizationContext();
  //     return organizationClient ? <GrantsNew /> : null;
  //   };

  const Component = () => (
    <Router history={history}>
      <GrantsNew />
    </Router>
  );

  beforeEach(() => {
    axios.get.mockResolvedValue(baseResponse);
    // axios.create.mockReturnValue(axios);
    useCurrentOrganizationContext.mockReturnValue({
      organizationClient: axios,
      currentOrganizationStore: {
        currentOrganization: {
          id: 10,
        },
      },
    });
    createGrant.mockImplementation(async () => {
      return { id: "" };
    });
  });

  it("renders", () => {
    const { unmount } = render(<Component />);
    expect(screen.getByText("Add New Grant")).toBeInTheDocument();
    unmount();
  });

  it("fetches funding organizations and renders them in the dropdown", async () => {
    render(<Component />);
    expect(await screen.findByText("org1")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
  });

  it("sets a funding org id value for newGrant", async () => {
    render(<Component />);
    const option = await screen.findByText("org1");
    userEvent.click(option);
    expect(screen.getAllByText("org1")).toHaveLength(2);
  });

  it("closes the funding orgs new popup when the user...", async () => {
    axios.get.mockResolvedValueOnce(baseResponse);
    axios.get.mockResolvedValueOnce({
      data: [
        { id: "20", name: "org20" },
        { id: "10", name: "org10" },
        { id: "30", name: "org30" },
      ],
    });
    const { unmount } = render(<Component />);
    const addFundingOrg = screen.getByText("Add Funding Organization");
    userEvent.click(addFundingOrg);
    const saveFundingOrg = await screen.findByText("Save New Funding Org");
    userEvent.click(saveFundingOrg);
    expect(axios.get).toHaveBeenCalled();
    expect(await screen.findAllByText("org10")).toHaveLength(2);
    unmount();
  });

  it("creates new grant with input values and then reroutes to grants index", async () => {
    render(<Component />);
    userEvent.click(await screen.findByText("org1"));
    userEvent.type(getTextBoxInput("Title"), "waffle grant");
    userEvent.type(getTextBoxInput("RFP URL"), "wafflegrant.com");
    userEvent.type(getTextBoxInput("Deadline"), "2021-09-08T08:19");
    userEvent.type(getTextBoxInput("Purpose"), "carbs");
    userEvent.click(screen.getByText("Save"));
    expect(createGrant).toHaveBeenCalledWith(axios, {
      title: "waffle grant",
      rfp_url: "wafflegrant.com",
      deadline: "2021-09-08T08:19",
      purpose: "carbs",
      funding_org_id: "1",
      organization_id: 10,
    });
    await wait(() => {
      expect(history.location.pathname).toEqual("/organizations/10/grants/");
    });
  });
});
