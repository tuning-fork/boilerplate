import React, { useEffect } from "react";
import Navbar from "../../design/Navbar/Navbar";
import Sidebar from "../../design/Sidebar/Sidebar";
import { useCurrentUser } from "../../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../../Contexts/currentOrganizationContext";
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
