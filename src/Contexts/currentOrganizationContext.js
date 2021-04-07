import React, { useContext, createContext, useReducer, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
      break;
    case "SET_CURRENT_ORGANIZATION_INFO":
      return {
        ...state,
        currentOrganizationInfo: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
};

export const CurrentOrganizationProvider = ({ children }) => {
  const store = {
    currentOrganization: "pancake 3.0",
    currentOrganizationInfo: null,
  };
  const [state, dispatch] = useReducer(reducer, store);
  useEffect(() => {}, [state.currentOrganizationInfo]);
  return (
    <CurrentOrganizationContext.Provider value={[state, dispatch]}>
      {children}
    </CurrentOrganizationContext.Provider>
  );
};
