import React, { useContext, createContext, useReducer, useEffect } from "react";

export const CurrentOrganizationContext = createContext();

export const useCurrentOrganizationContext = () => {
  return useContext(CurrentOrganizationContext);
};

const reducer = (state, action) => {
  switch (action.type) {
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
    case "SET_ALL_USER_ORGANIZATIONS":
      return {
        ...state,
        allUserOrganizations: action.payload,
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
  useEffect(() => {}, [currentOrganizationStore.currentOrganizationInfo]);
  return (
    <CurrentOrganizationContext.Provider
      value={[currentOrganizationStore, currentOrganizationDispatch]}
    >
      {children}
    </CurrentOrganizationContext.Provider>
  );
};
