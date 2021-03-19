import React, { useContext, createContext, useReducer } from "react";
import { NavLink } from "react-router-dom";

export const CurrentUserContext = createContext({
  currentUser: "pancake 2.0",
});

export const CurrentUserProvider = CurrentUserContext.Provider;
export const CurrentUserConsumer = CurrentUserContext.Consumer;

export default CurrentUserContext;
