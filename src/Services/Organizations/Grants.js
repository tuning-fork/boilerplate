import axios from "axios";

// getGrant
const getGrant = (organizationService, grantId) => {
  return organizationService
    .get(`/grants/${grantId}`)
    .then((response) => response.data);
};

// listGrants

// deleteGrant

// createGrant

// updateGrant

// copyGrant
