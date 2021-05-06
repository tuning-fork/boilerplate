// getBio
export const getBio = (organizationService, bioId) => {
  return organizationService
    .get(`/bios/${bioId}`)
    .then((response) => response.data);
};

// listBios

export const getAllBios = (organizationService) => {
  return organizationService.get(`/bios/`).then((response) => response.data);
};

// deleteBio

export const deleteBio = (organizationService) => {
  return organizationService.delete(`/bios/`).then((response) => response.data);
};

// createBio

export const createBio = (organizationService) => {
  return organizationService.post(`/bios/`).then((response) => response.data);
};

// updateBio

export const updateBio = (organizationService, bioId, fieldsToUpdate) => {
  return organizationService
    .patch(`/bios/${bioId}`, fieldsToUpdate)
    .then((response) => response.data);
};
