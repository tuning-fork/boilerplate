import React, { useContext, createContext, useReducer, useEffect } from "react";
import { login as createSession, authWithJwt } from "../Services/Auth/Login";

export const CurrentUserContext = createContext();

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload.user,
        jwt: action.payload.jwt,
        status: "successful",
        errors: [],
      };
    case "SET_AUTHENTICATION_ERROR":
      return {
        ...state,
        currentUser: null,
        status: "error",
        errors: [action.payload],
      };
    case "SET_AUTHENTICATION_REQUIRED":
      return {
        ...state,
        currentUser: null,
        status: "authentication required",
        errors: [],
      };
    default:
      return state;
  }
};

export const CurrentUserProvider = ({ children }) => {
  const store = {
    currentUser: null,
    jwt: null,
    status: null,
    errors: [],
  };

  const [currentUserStore, currentUserDispatch] = useReducer(reducer, store);

  const login = (email, password) => {
    return createSession(email, password)
      .then((response) => {
        currentUserDispatch({
          type: "SET_CURRENT_USER",
          payload: response,
        });
      })
      .catch((error) => {
        currentUserDispatch({
          type: "SET_AUTHENTICATION_ERROR",
          payload: error,
        });
        throw error;
      });
  };

  useEffect(() => {
    const savedJwt = localStorage.getItem("token");
    if (savedJwt) {
      authWithJwt(savedJwt)
        .then(({ jwt, user }) => {
          currentUserDispatch({
            type: "SET_CURRENT_USER",
            payload: { jwt, user },
          });
        })
        .catch((error) => {
          currentUserDispatch({
            type: "SET_AUTHENTICATION_ERROR",
            payload: error,
          });
          throw error;
        });
    }
  }, []);

  const context = {
    currentUserStore,
    currentUserDispatch,
    login,
  };

  return (
    <CurrentUserContext.Provider value={context}>
      {children}
    </CurrentUserContext.Provider>
  );
};
