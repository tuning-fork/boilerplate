import React from "react";
import Navbar from "../../design/Navbar/Navbar";
import { useCurrentUser } from "../../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../../Contexts/currentOrganizationContext";
import "./UserLayout.css";

export default function UserLayout(props) {
  const { user } = useCurrentUser();
  const { currentOrganization } = useCurrentOrganization();

  return (
    <main className="user-layout">
      <Navbar
        organizationName={
          currentOrganization ? currentOrganization.name : "banana"
        }
        user={user}
      />
      <div className="user-layout__content">{props.children}</div>
    </main>
  );
}
