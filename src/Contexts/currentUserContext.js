import React, { useContext, createContext, useReducer, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { login as createSession, authWithJwt } from "../Services/Auth/Login";
import { useCurrentOrganizationContext } from "./currentOrganizationContext";
import { id } from "date-fns/locale";

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
    case "SET_CURRENT_USER_INFO":
      console.log("user info reset", [state, action]);
      return {
        ...state,
        currentUserInfo: action.payload.user,
        jwt: action.payload.jwt,
        status: "successful",
        errors: [],
      };
    case "SET_AUTHENTICATION_ERROR":
      return {
        ...state,
        currentUserInfo: null,
        status: "error",
        errors: [action.payload],
      };
    case "SET_AUTHENTICATION_REQUIRED":
      return {
        ...state,
        currentUserInfo: null,
        status: "authentication required",
        errors: [],
      };
    default:
      return state;
  }
};

export const CurrentUserProvider = ({ children }) => {
  const store = {
    currentUser: "pancake 3.0",
    currentUserInfo: null,
  };
  const [currentUserStore, currentUserDispatch] = useReducer(reducer, store);
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  const login = (email, password) => {
    return createSession(email, password)
      .then((response) => {
        currentUserDispatch({
          type: "SET_CURRENT_USER_INFO",
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
            type: "SET_CURRENT_USER_INFO",
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

  useEffect(() => {
    const userId =
      currentUserStore?.currentUserInfo?.id || localStorage.user_id;
    console.log(userId);
    axios
      .get(`/api/organization_users/assoc/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
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
  }, [currentUserStore.currentUserInfo]);

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
