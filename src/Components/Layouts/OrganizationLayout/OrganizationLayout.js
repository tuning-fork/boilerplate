import React, { useEffect } from "react";
import Navbar from "components/design/Navbar/Navbar";
import Sidebar from "components/design/Sidebar/Sidebar";
import { useCurrentUser } from "../../../contexts/currentUserContext";
import { useCurrentOrganization } from "../../../contexts/currentOrganizationContext";
import "./OrganizationLayout.css";
import { useParams } from "react-router-dom";

export default function OrganizationLayout(props) {
  const { user } = useCurrentUser();
  const {
    currentOrganization,
    isLoadingOrganization,
    fetchCurrentOrganization,
  } = useCurrentOrganization();
  const { organizationId } = useParams();

  useEffect(() => {
    if (!currentOrganization && !isLoadingOrganization) {
      fetchCurrentOrganization(organizationId);
    }
  }, [
    currentOrganization,
    isLoadingOrganization,
    fetchCurrentOrganization,
    organizationId,
  ]);

  if (!currentOrganization) {
    return "Loading org...";
  }

  return (
    <main className="organization-layout">
      <Navbar organizationName={currentOrganization.name} user={user} />
      <div className="organization-layout__content">
        <Sidebar />
        {props.children}
      </div>
    </main>
  );
}
