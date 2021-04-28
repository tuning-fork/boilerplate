import React, { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";

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
      return {
        ...state,
        currentOrganization: action.payload,
      };
    case "SET_CURRENT_ORGANIZATION_INFO":
      return {
        ...state,
        currentOrganizationInfo: action.payload,
      };
    default:
      return state;
  }
};

export const CurrentOrganizationProvider = ({ children }) => {
  const store = {
    allUserOrganizations: [],
    currentOrganization: "pancake 3.0",
    currentOrganizationInfo: null,
  };
  const [currentOrganizationStore, currentOrganizationDispatch] = useReducer(
    reducer,
    store
  );
  useEffect(() => {
    const selectedOrgId = localStorage.getItem("org_id");
    if (selectedOrgId) {
      axios
        .get(`/api/organizations/${selectedOrgId}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          currentOrganizationDispatch({
            type: "SET_CURRENT_ORGANIZATION_INFO",
            payload: response.data,
          });
        });
    }
  }, []);
  useEffect(() => {}, [currentOrganizationStore.currentOrganizationInfo]);
  return (
    <CurrentOrganizationContext.Provider
      value={[currentOrganizationStore, currentOrganizationDispatch]}
    >
      {children}
    </CurrentOrganizationContext.Provider>
  );
};
