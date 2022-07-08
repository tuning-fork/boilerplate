import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  MdHome,
  MdLocalAtm,
  MdExtension,
  MdAccountBalance,
  MdFormatListBulleted,
  MdPerson,
} from "react-icons/md";
import "./Sidebar.css";
import CurrentOrganizationLink from "../../Helpers/CurrentOrganizationLink";

export default function Sidebar(props) {
  return (
    <nav className={clsx(props.className, "sidebar")}>
      <ul className="sidebar__list">
        <li>
          <CurrentOrganizationLink
            as={NavLink}
            className="sidebar__navitem"
            activeClassName="sidebar__navitem--selected"
            to="/dashboard"
          >
            <MdHome />
            Dashboard
          </CurrentOrganizationLink>
        </li>

        <li>
          <CurrentOrganizationLink
            as={NavLink}
            className="sidebar__navitem"
            activeClassName="sidebar__navitem--selected"
            to="/grants"
          >
            <MdLocalAtm />
            Grants
          </CurrentOrganizationLink>
        </li>
        <li>
          <CurrentOrganizationLink
            as={NavLink}
            className="sidebar__navitem"
            activeClassName="sidebar__navitem--selected"
            to="/boilerplates"
          >
            <MdExtension />
            Boilerplates
          </CurrentOrganizationLink>
        </li>
        <li>
          <CurrentOrganizationLink
            as={NavLink}
            className="sidebar__navitem"
            activeClassName="sidebar__navitem--selected"
            to="/funding_orgs"
          >
            <MdAccountBalance />
            Funding Organizations
          </CurrentOrganizationLink>
        </li>
        <li>
          <CurrentOrganizationLink
            as={NavLink}
            className="sidebar__navitem"
            activeClassName="sidebar__navitem--selected"
            to="/categories"
          >
            <MdFormatListBulleted />
            Categories
          </CurrentOrganizationLink>
        </li>
        <li>
          <CurrentOrganizationLink
            as={NavLink}
            className="sidebar__navitem"
            activeClassName="sidebar__navitem--selected"
            to="/users"
          >
            <MdPerson />
            Users
          </CurrentOrganizationLink>
        </li>
      </ul>
    </nav>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
};
