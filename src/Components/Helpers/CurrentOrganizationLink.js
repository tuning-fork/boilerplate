import { Link } from "react-router-dom";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";

export default function CurrentOrganizationLink(props) {
  const { currentOrganizationStore } = useCurrentOrganizationContext();
  const currentOrganizationId = currentOrganizationStore.currentOrganization.id;
  const to = `/organizations/${currentOrganizationId}${props.to}`;

  return <Link {...props} to={to} />;
}
