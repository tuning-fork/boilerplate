import React, { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useCurrentUserContext } from "./currentUserContext";

export const CurrentOrganizationContext = createContext();

export const useCurrentOrganizationContext = () => {
  return useContext(CurrentOrganizationContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_USER_ORGANIZATIONS":
      return {
        ...state,
        allUserOrganizations: action.payload,
      };
    case "SET_CURRENT_ORGANIZATION":
      const { currentOrganization, jwt } = action.payload;
      const organizationClient = axios.create({
        baseURL: `/api/organizations/${currentOrganization.id}`,
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return {
        ...state,
        currentOrganization,
        organizationClient,
      };
    default:
      return state;
  }
};

export const CurrentOrganizationProvider = ({ children }) => {
  const store = {
    allUserOrganizations: [],
    currentOrganization: null,
    organizationClient: null,
  };
  const [currentOrganizationStore, currentOrganizationDispatch] = useReducer(
    reducer,
    store
  );
  const { currentUserStore } = useCurrentUserContext();

  useEffect(() => {
    const userId = currentUserStore.currentUser?.id;

    if (!userId) {
      return;
    }

    axios
      .get(`/api/organization_users/assoc/${userId}`, {
        headers: { Authorization: `Bearer ${currentUserStore?.jwt}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          currentOrganizationDispatch({
            type: "SET_ALL_USER_ORGANIZATIONS",
            payload: response.data,
          });
        } else {
          console.log("setting default data");
          currentOrganizationDispatch({
            type: "SET_ALL_USER_ORGANIZATIONS",
            payload: [
              { id: 1, name: "org1" },
              { id: 2, name: "org2" },
              { id: 3, name: "org3" },
            ],
          });
        }
      })
      .catch((error) => console.log(error));

    const selectedOrgId = localStorage.getItem("org_id");
    if (selectedOrgId) {
      axios
        .get(`/api/organizations/${selectedOrgId}`, {
          headers: { Authorization: `Bearer ${currentUserStore?.jwt}` },
        })
        .then((response) => {
          currentOrganizationDispatch({
            type: "SET_CURRENT_ORGANIZATION",
            payload: {
              currentOrganization: response.data,
              jwt: currentUserStore?.jwt,
            },
          });
        });
    }
  }, [currentUserStore.jwt, currentUserStore.currentUser]);

  return (
    <CurrentOrganizationContext.Provider
      value={{
        currentOrganizationStore,
        currentOrganizationDispatch,
        organizationClient: currentOrganizationStore.organizationClient,
      }}
    >
      {children}
      {/* {currentOrganizationStore.organizationClient
        ? children
        : "Loading Organization..."} */}
    </CurrentOrganizationContext.Provider>
  );
};
