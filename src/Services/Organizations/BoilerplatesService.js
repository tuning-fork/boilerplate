// getBoilerplate
export const getBoilerplate = (organizationService, boilerplateId) => {
  return organizationService
    .get(`/boilerplates/${boilerplateId}`)
    .then((response) => response.data);
};

// listBoilerplates

export const getAllBoilerplates = (organizationService) => {
  return organizationService
    .get(`/boilerplates/`)
    .then((response) => response.data);
};

// deleteBoilerplate

export const deleteBoilerplate = (organizationService) => {
  return organizationService
    .delete(`/boilerplates/`)
    .then((response) => response.data);
};

// createBoilerplate

export const createBoilerplate = (organizationService) => {
  return organizationService
    .post(`/boilerplates/`)
    .then((response) => response.data);
};

// updateBoilerplate

export const updateBoilerplate = (
  organizationService,
  boilerplateId,
  fieldsToUpdate
) => {
  return organizationService
    .patch(`/boilerplates/${boilerplateId}`, fieldsToUpdate)
    .then((response) => response.data);
};
