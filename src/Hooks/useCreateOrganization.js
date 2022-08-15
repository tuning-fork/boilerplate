import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../contexts/currentUserContext";
import * as OrganizationService from "../services/OrganizationService";

/**
 * Returns a function to call for creating an organization.
 * @param {object} [options]
 * @param {(organization) => void} [options.onSuccess] Callback invoked when
 * organization has been created.
 * @returns {(organizationFields) => void}
 */
export default function useCreateOrganization(options = {}) {
  const { onSuccess } = options;

  const queryClient = useQueryClient();
  const history = useHistory();
  const { authenticatedApiClient } = useCurrentUser();

  const { mutate: createOrganization } = useMutation(
    (fields) =>
      OrganizationService.createOrganization(authenticatedApiClient, fields),
    {
      onSuccess(organization) {
        history.push(`/organizations/${organization.id}`);
        // Refetch user's organizations in current user context
        queryClient.invalidateQueries("organizations");
        onSuccess?.(organization);
      },
    }
  );

  return createOrganization;
}
