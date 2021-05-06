// getGrant
export const getGrant = (organizationService, grantId) => {
  return organizationService
    .get(`/grants/${grantId}`)
    .then((response) => response.data);
};

// listGrants

export const getAllGrants = (organizationService) => {
  return organizationService.get(`/grants/`).then((response) => response.data);
};

// deleteGrant

export const deleteGrant = (organizationService) => {
  return organizationService
    .delete(`/grants/`)
    .then((response) => response.data);
};

// createGrant

export const createGrant = (organizationService) => {
  return organizationService.post(`/grants/`).then((response) => response.data);
};

// updateGrant

export const updateGrant = (organizationService, grantId, fieldsToUpdate) => {
  return organizationService
    .patch(`/grants/${grantId}`, fieldsToUpdate)
    .then((response) => response.data);
};

// copyGrant

export const copyGrant = (organizationService) => {
  return organizationService.post(`/grants/`).then((response) => response.data);
};
