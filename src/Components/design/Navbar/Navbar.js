import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import UserIcon from "../../Helpers/UserIcon";
import { ReactComponent as Logo } from "./BOILERPLATE.svg";
import DropdownMini from "../DropdownMini/DropdownMini";
import "./Navbar.css";
import { useCurrentUser } from "../../../Contexts/currentUserContext";

export default function Navbar(props) {
  const history = useHistory();
  const { logout } = useCurrentUser();

  const handleDropdownMiniAction = async ({ option }) => {
    try {
      switch (option.value) {
        case "LOGOUT":
          logout();
          history.replace("/splashpage", { loggedOut: true });
          break;
        case "USER_MENU":
          console.log("waffle!");
          break;
        default:
          console.log("default");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={clsx(props.className, "navbar")}>
      <Logo className="navbar__logo" />
      <div className={clsx(props.className, "navbar__links")}>
        {props.organizationName && (
          <>
            <Link to="/organizations" className="navbar__all-organizations">
              {"<"} All Organizations
            </Link>
            <span className="navbar__divider"> | </span>
            <span>{props.organizationName}</span>
          </>
        )}
        <div className="navbar__user-icon">
          <DropdownMini
            navbar
            className="navbar__see-more"
            labelText="Further Actions"
            placeholder="Pick One"
            options={[
              { value: "LOGOUT", label: "Logout" },
              { value: "USER_MENU", label: "User Menu" },
            ]}
            displayIcon={
              <UserIcon
                firstName={props.user.firstName}
                lastName={props.user.lastName}
              />
            }
            onChange={(option) => handleDropdownMiniAction({ option })}
          />
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  organizationName: PropTypes.string,
};
