import React from "react";
import { HashRouter } from "react-router-dom";
import {
  CurrentUserContext,
  CurrentUserStatus,
} from "../../../contexts/currentUserContext";
import Component from "./Navbar";

const MockCurrentUserProvider = (Story) => (
  <CurrentUserContext.Provider
    value={{
      status: CurrentUserStatus.SUCCESS,
      error: null,
      user: {
        firstName: "Chidi",
        lastName: "Anagonye",
      },
      jwt: "2906e7695a1948038e253074bfabc077",
      logout: () => console.log("Logout called!"),
    }}
  >
    <Story />
  </CurrentUserContext.Provider>
);

export default {
  title: "Design/Navbar",
  component: Component,
  args: {
    user: { firstName: "Chidi", lastName: "Anagonye" },
    organizationName: "Baklava Foundation",
  },
  decorators: [MockCurrentUserProvider],
};

export const Navbar = (props) => (
  <HashRouter>
    <Component {...props} />
  </HashRouter>
);
