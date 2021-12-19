import React, { useEffect } from "react";
import Navbar from "../../design/Navbar/Navbar";
import Sidebar from "../../design/Sidebar/Sidebar";
import { useCurrentUser } from "../../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../../Contexts/currentOrganizationContext";
import "./OrganizationLayout.css";
import { useParams } from "react-router-dom";

export default function OrganizationLayout(props) {
  const { user } = useCurrentUser();
  const { selectedOrganization, fetchSelectedOrganization } =
    useCurrentOrganization();
  const { organizationId } = useParams();

  useEffect(() => {
    if (!selectedOrganization) {
      fetchSelectedOrganization(organizationId);
    }
  }, [selectedOrganization, fetchSelectedOrganization, organizationId]);

  if (!selectedOrganization) {
    return "Loading org...";
  }

  return (
    <main className="organization-layout">
      <Navbar organizationName={selectedOrganization.name} user={user} />
      <div className="organization-layout__content">
        <Sidebar />
        {props.children}
      </div>
    </main>
  );
}
