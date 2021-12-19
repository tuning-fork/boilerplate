import { useResource } from "rest-hooks";
import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";

export default function useOrganizationResource(resource) {
  const { selectedOrganization } = useCurrentOrganization();
  return useResource(resource, { organizationId: selectedOrganization.id });
}
