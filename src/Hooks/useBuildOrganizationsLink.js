import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";

export default function useBuildOrganizationsLink() {
  const { currentOrganization } = useCurrentOrganization();

  return (path) => {
    return `/organizations/${currentOrganization.id}${path}`;
  };
}
