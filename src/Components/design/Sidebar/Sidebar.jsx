import React, { useContext } from "react";
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
import { CurrentOrganizationContext } from "../../../Contexts/currentOrganizationContext";

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
];

const ADMIN_LINKS = [{ icon: <MdPerson />, title: "Users", path: "/users" }];

export default function Sidebar(props) {
  const { isCurrentUserAdmin } = useContext(CurrentOrganizationContext);
  const links = isCurrentUserAdmin ? [...LINKS, ...ADMIN_LINKS] : LINKS;

  return (
    <nav className={clsx(props.className, "sidebar")}>
      <ul className="sidebar__list">
        {links.map(({ icon, title, path }) => (
          <li data-testid={title} key={title}>
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
