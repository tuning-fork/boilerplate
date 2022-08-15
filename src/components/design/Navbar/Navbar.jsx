import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../design/Avatar/Avatar";
import { ReactComponent as Logo } from "./BOILERPLATE.svg";
import DropdownMini from "../DropdownMini/DropdownMini";
import "./Navbar.css";
import { useCurrentUser } from "../../../contexts/currentUserContext";

export default function Navbar(props) {
  const history = useHistory();
  const { logout } = useCurrentUser();

  const handleDropdownMiniAction = ({ option }) => {
    switch (option.value) {
      case "LOGOUT":
        logout();
        history.replace("/splashpage", { loggedOut: true });
        break;
      default:
        throw new TypeError("Unexpected option given to dropdown");
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
            options={[{ value: "LOGOUT", label: "Logout" }]}
            displayIcon={
              <Avatar>
                {props.user.firstName} {props.user.lastName}
              </Avatar>
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
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
  }).isRequired,
  organizationName: PropTypes.string,
};
