import React, { useContext, createContext, useReducer, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

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
        currentUserInfo: action.payload,
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

  useEffect(() => {
    // console.log("did the useEffect render?");
    // if (currentUserStore || localStorage.user_id) {
    //   console.log("did the if statement run?");
    //   axios
    //     .get(`/api/organization_users`, {
    //       headers: { Authorization: `Bearer ${localStorage.token}` },
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => console.log(error));
    // }
    const userId =
      currentUserStore?.currentUserInfo?.id || localStorage.user_id;
    console.log(userId);
    axios
      .get(`/api/organization_users/assoc/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        console.log(response);
        if (response.length > 0) {
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
  return (
    <CurrentUserContext.Provider
      value={[currentUserStore, currentUserDispatch]}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

// def assoc
// @organization_users = OrganizationUser.where(user_id: params[:user_id])
// all_org_ids = @organization_users.map { |f| f.id }
// all_org_users = Organizations.where(id: all_org_ids)

// @organization_user = @organization_user.order(id: :desc)

// render json {data: all_org_users}
// end

// // @organization_users.map do |organization_user|
// //   render partial: "organization_users.json.jb", locals: {organization_user: organization_user}
// // end
