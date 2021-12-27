import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../Components/Helpers/Spinner";
import {
  CurrentUserStatus,
  useCurrentUser,
} from "../Contexts/currentUserContext";

export default function Logout() {
  const { status, logout } = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (status === CurrentUserStatus.LOGIN_REQUIRED) {
      return history.replace("/login", { loggedOut: true });
    }
    return logout();
  }, [status, logout, history]);

  return (
    <>
      Logging you out...
      <Spinner />
    </>
  );
}
