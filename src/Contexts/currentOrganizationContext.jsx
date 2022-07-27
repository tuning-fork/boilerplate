import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { useCurrentUser } from "./currentUserContext";
import apiClient from "../config/apiClient";
import {
  getOrganization,
  getUserOrganizations,
} from "../Services/OrganizationService";

export const CurrentOrganizationContext = createContext();

export const useCurrentOrganization = () =>
  useContext(CurrentOrganizationContext);

export const CurrentOrganizationProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState();
  const [organizationClient, setOrganizationClient] = useState();
  const [isLoadingOrganization, setIsLoadingOrganization] = useState(false);
  const { user, authenticatedApiClient } = useCurrentUser();

  const fetchUserOrganizations = useCallback(async () => {
    const organizations = await getUserOrganizations(authenticatedApiClient);
    setOrganizations(organizations);
  }, [authenticatedApiClient]);

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
    fetchUserOrganizations,
    isLoadingOrganization,
    organizationClient,
    organizations,
  };

  useEffect(() => {
    if (user) {
      fetchUserOrganizations();
    }
  }, [user, fetchUserOrganizations]);

  return (
    <CurrentOrganizationContext.Provider value={context}>
      {children}
    </CurrentOrganizationContext.Provider>
  );
};
