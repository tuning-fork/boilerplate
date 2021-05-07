// getBio
export const getBio = (organizationClient, bioId) => {
  return organizationClient
    .get(`/bios/${bioId}`)
    .then((response) => response.data);
};

// listBios

export const getAllBios = (organizationClient) => {
  return organizationClient.get(`/bios/`).then((response) => response.data);
};

// deleteBio

export const deleteBio = (organizationClient) => {
  return organizationClient.delete(`/bios/`).then((response) => response.data);
};

// createBio

export const createBio = (organizationClient) => {
  return organizationClient.post(`/bios/`).then((response) => response.data);
};

// updateBio

export const updateBio = (organizationClient, bioId, fieldsToUpdate) => {
  return organizationClient
    .patch(`/bios/${bioId}`, fieldsToUpdate)
    .then((response) => response.data);
};
