import React from "react";
import Navbar from "../../design/Navbar/Navbar";
import { useCurrentUser } from "../../../Contexts/currentUserContext";
import "./NavbarLayout.css";

export default function NavbarLayout(props) {
  const { user } = useCurrentUser();

  return (
    <main className="navbar-layout">
      <Navbar user={user} />
      {props.children}
    </main>
  );
}

export function withNavbarLayout(Component) {
  return (props) => (
    <NavbarLayout>
      <Component {...props} />
    </NavbarLayout>
  );
}
