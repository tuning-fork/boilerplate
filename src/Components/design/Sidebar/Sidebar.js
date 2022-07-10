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

const LINKS = [
  { icon: <MdHome />, title: "Dashboard", path: "/dashboard" },
  { icon: <MdLocalAtm />, title: "Grants", path: "/grants" },
  { icon: <MdExtension />, title: "Boilerplates", path: "/boilerplates" },
  {
    icon: <MdAccountBalance />,
    title: "Funding Organizations",
    path: "/funding_orgs",
  },
  { icon: <MdFormatListBulleted />, title: "Categories", path: "/categories" },
  { icon: <MdPerson />, title: "Users", path: "/users" },
];

export default function Sidebar(props) {
  return (
    <nav className={clsx(props.className, "sidebar")}>
      <ul className="sidebar__list">
        {LINKS.map(({ icon, title, path }) => (
          <li key={title}>
            <CurrentOrganizationLink
              as={NavLink}
              className="sidebar__navitem"
              activeClassName="sidebar__navitem--selected"
              to={path}
            >
              {icon}
              {title}
            </CurrentOrganizationLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
};
