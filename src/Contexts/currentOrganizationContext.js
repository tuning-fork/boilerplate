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

export const useCurrentOrganizationContext = () =>
  useContext(CurrentOrganizationContext);

export const useCurrentOrganization = () =>
  useContext(CurrentOrganizationContext);

export const CurrentOrganizationProvider = ({ children }) => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState();
  const [organizationClient, setOrganizationClient] = useState();
  const { user, authenticatedApiClient } = useCurrentUser();

  const fetchUserOrganizations = useCallback(async () => {
    const organizations = await getUserOrganizations(
      authenticatedApiClient,
      user.id
    );
    setOrganizations(organizations);
  }, [user, authenticatedApiClient]);

  const fetchSelectedOrganization = async (organizationId) => {
    const organization = await getOrganization(
      authenticatedApiClient,
      organizationId
    );
    setSelectedOrganization(organization);

    const organizationClient = axios.create({
      ...authenticatedApiClient.defaults,
      baseURL: `${apiClient.defaults.baseURL}/organizations/${organizationId}`,
    });
    setOrganizationClient(organizationClient);
  };

  const context = {
    fetchSelectedOrganization,
    organizationClient,
    organizations,
    selectedOrganization,
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
