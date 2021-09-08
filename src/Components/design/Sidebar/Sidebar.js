import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
// Dashboard Icon
import HomeIcon from "@material-ui/icons/Home";
//Grants Icon
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
//Boilerplates Icon
import ExtensionIcon from "@material-ui/icons/Extension";
//Reports Icon
import BarChartIcon from "@material-ui/icons/BarChart";
//Funding Organizations Icon
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
//Categories Icon
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PersonIcon from "@material-ui/icons/Person";

import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <div className={clsx(props.className, "sidebar")}>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/dashboard`}
      >
        <HomeIcon />
        Dashboard
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/grants`}
      >
        <LocalAtmIcon />
        Grants
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/boilerplates`}
      >
        <ExtensionIcon />
        Boilerplates
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/reports`}
      >
        <BarChartIcon />
        Reports
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/funding_orgs`}
      >
        <AccountBalanceIcon />
        Funding Organizations
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/categories`}
      >
        <FormatListBulletedIcon />
        Categories
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/users`}
      >
        <PersonIcon />
        Users
      </NavLink>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  organizationId: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {};
