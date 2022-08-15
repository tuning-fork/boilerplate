import { Redirect } from "react-router-dom";
import { useCurrentOrganization } from "../../contexts/currentOrganizationContext";

export default function RedirectToDashboard() {
  const { currentOrganization } = useCurrentOrganization();
  return <Redirect to={`/organizations/${currentOrganization.id}/dashboard`} />;
}
