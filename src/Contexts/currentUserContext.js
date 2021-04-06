import React, { useContext, createContext, useReducer, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const CurrentUserContext = createContext();

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
      break;
    case "SET_CURRENT_USER_INFO":
      console.log("user info reset", [state, action]);
      return {
        ...state,
        currentUserInfo: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
};

export const CurrentUserProvider = ({ children }) => {
  const store = {
    currentUser: "pancake 3.0",
    currentUserInfo: null,
  };
  const [state, dispatch] = useReducer(reducer, store);
  useEffect(() => {}, [state.currentUserInfo]);
  return (
    <CurrentUserContext.Provider value={[state, dispatch]}>
      {children}
    </CurrentUserContext.Provider>
  );
};
