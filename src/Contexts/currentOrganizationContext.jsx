import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "./currentUserContext";
import apiClient from "../config/apiClient";
import { getOrganization } from "../Services/OrganizationService";

export const CurrentOrganizationContext = createContext();

export const useCurrentOrganization = () =>
  useContext(CurrentOrganizationContext);

export const CurrentOrganizationProvider = ({ children }) => {
  const [currentOrganization, setCurrentOrganization] = useState();
  const [organizationClient, setOrganizationClient] = useState();
  const [isLoadingOrganization, setIsLoadingOrganization] = useState(false);
  const { authenticatedApiClient } = useCurrentUser();

  const fetchCurrentOrganization = async (organizationId) => {
    try {
      setIsLoadingOrganization(true);

      const organizationClient = axios.create({
        ...authenticatedApiClient.defaults,
        baseURL: `${apiClient.defaults.baseURL}/organizations/${organizationId}`,
      });
      setOrganizationClient(() => organizationClient);

      const organization = await getOrganization(
        authenticatedApiClient,
        organizationId
      );
      setCurrentOrganization(organization);
    } finally {
      setIsLoadingOrganization(false);
    }
  };

  const context = {
    currentOrganization,
    fetchCurrentOrganization,
    isLoadingOrganization,
    organizationClient,
  };

  return (
    <CurrentOrganizationContext.Provider value={context}>
      {children}
    </CurrentOrganizationContext.Provider>
  );
};
