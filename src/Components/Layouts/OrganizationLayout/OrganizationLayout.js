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
  const currentUserName = `${currentUserStore.currentUser?.first_name} ${currentUserStore.currentUser?.last_name}`;

  return (
    <main className="layout">
      <Navbar
        organizationName={currentOrganization?.name}
        userName={currentUserName}
      />
      <div className="layout__content">
        <Sidebar organizationId={currentOrganization?.id} />
        {props.children}
      </div>
    </main>
  );
}
