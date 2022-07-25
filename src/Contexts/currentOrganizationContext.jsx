import React, { useContext, createContext, useMemo } from "react";
import axios from "axios";
import { useCurrentUser } from "./currentUserContext";
import { getOrganization } from "../Services/OrganizationService";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export const CurrentOrganizationContext = createContext();

export const useCurrentOrganization = () =>
  useContext(CurrentOrganizationContext);

export const CurrentOrganizationProvider = ({ children }) => {
  const { organizationId } = useParams();
  const { authenticatedApiClient } = useCurrentUser();

  const organizationClient = useMemo(
    () =>
      axios.create({
        ...authenticatedApiClient.defaults,
        baseURL: `${authenticatedApiClient.defaults.baseURL}/organizations/${organizationId}`,
      }),
    [authenticatedApiClient, organizationId]
  );

  const { data: currentOrganization } = useQuery(
    ["currentOrganization", authenticatedApiClient, organizationId],
    () => getOrganization(authenticatedApiClient, organizationId)
  );

  const context = {
    currentOrganization,
    organizationClient,
  };

  return (
    <CurrentOrganizationContext.Provider value={context}>
      {children}
    </CurrentOrganizationContext.Provider>
  );
};
