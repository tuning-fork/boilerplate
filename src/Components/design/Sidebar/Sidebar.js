import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  MdHome,
  MdLocalAtm,
  MdExtension,
  MdBarChart,
  MdAccountBalance,
  MdFormatListBulleted,
  MdPerson,
} from "react-icons/md";

import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <div className={clsx(props.className, "sidebar")}>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/dashboard`}
      >
        <MdHome />
        Dashboard
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/grants`}
      >
        <MdLocalAtm />
        Grants
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/boilerplates`}
      >
        <MdExtension />
        Boilerplates
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/reports`}
      >
        <MdBarChart />
        Reports
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/funding_orgs`}
      >
        <MdAccountBalance />
        Funding Organizations
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/categories`}
      >
        <MdFormatListBulleted />
        Categories
      </NavLink>
      <NavLink
        className="sidebar__navitem"
        activeClassName="sidebar__navitem--selected"
        to={`/organizations/${props.organizationId}/users`}
      >
        <MdPerson />
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
