// getBoilerplate
export const getBoilerplate = (organizationClient, boilerplateId) => {
  return organizationClient
    .get(`/boilerplates/${boilerplateId}`)
    .then((response) => response.data);
};

// listBoilerplates

export const getAllBoilerplates = (organizationClient) => {
  return organizationClient
    .get(`/boilerplates/`)
    .then((response) => response.data);
};

// deleteBoilerplate

export const deleteBoilerplate = (organizationClient) => {
  return organizationClient
    .delete(`/boilerplates/`)
    .then((response) => response.data);
};

// createBoilerplate

export const createBoilerplate = (organizationClient, newBoilerplate) => {
  return organizationClient
    .post(`/boilerplates/`, newBoilerplate)
    .then((response) => response.data);
};

// updateBoilerplate

export const updateBoilerplate = (
  organizationClient,
  boilerplateId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/boilerplates/${boilerplateId}`, fieldsToUpdate)
    .then((response) => response.data);
};
