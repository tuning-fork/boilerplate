import React from "react";
import Navbar from "../../design/Navbar/Navbar";
import Sidebar from "../../design/Sidebar/Sidebar";
import "./OrganizationLayout.css";
import { useCurrentOrganizationContext } from "../../../Contexts/currentOrganizationContext";
import { useCurrentUserContext } from "../../../Contexts/currentUserContext";

export default function OrganizationLayout(props) {
  const { currentUserStore } = useCurrentUserContext();
  const { currentOrganizationStore } = useCurrentOrganizationContext();
  const { currentOrganization } = currentOrganizationStore;

  if (!currentUserStore.currentUser || !currentOrganization) {
    return "Loading...";
  }

  return (
    <main className="layout">
      <Navbar
        organizationName={currentOrganization.name}
        user={currentUserStore.currentUser}
      />
      <div className="layout__content">
        <Sidebar />
        {props.children}
      </div>
    </main>
  );
}
