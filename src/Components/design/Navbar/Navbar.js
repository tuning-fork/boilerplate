import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import UserIcon from "components/UserIcon/UserIcon";
import { ReactComponent as Logo } from "./BOILERPLATE.svg";
import DropdownMini from "../DropdownMini/DropdownMini";
import { useCurrentUser } from "contexts/currentUserContext";
import "./Navbar.css";

export default function Navbar(props) {
  const history = useHistory();
  const { logout } = useCurrentUser();

  const handleDropdownMiniAction = ({ option }) => {
    switch (option.value) {
      case "LOGOUT":
        logout();
        history.replace("/SplashPage", { loggedOut: true });
        break;
      // case "USER_MENU":
      //   console.log("waffle!");
      //   break;
      default:
        console.log("default");
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
            className="navbar__see-more"
            dropDownMenuClassName="navbar__dropdown-menu"
            options={[
              { value: "LOGOUT", label: "Logout" },
              // { value: "USER_MENU", label: "User Menu" },
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
