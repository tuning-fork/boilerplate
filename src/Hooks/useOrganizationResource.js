import { useResource } from "rest-hooks";
import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";

export default function useOrganizationResource(resource) {
  const { currentOrganization } = useCurrentOrganization();
  return useResource(resource, { organizationId: currentOrganization.id });
}
