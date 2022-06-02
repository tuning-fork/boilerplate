export const mapSection = (apiSection) => ({
  id: apiSection.id.toString(),
  wordCount: apiSection.wordcount,
  title: apiSection.title,
  text: apiSection.text,
  sortOrder: apiSection.sort_order,
});

export const getSection = (organizationClient, grantId, grantSectionId) => {
  return organizationClient
    .get(`/grants/${grantId}/sections/${grantSectionId}`)
    .then((response) => response.data);
};

export const getAllSections = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}/sections/`)
    .then((response) => response.data);
};

export const deleteSection = (organizationClient, grantId, grantSectionId) => {
  return organizationClient
    .delete(`/grants/${grantId}/sections/${grantSectionId}`)
    .then((response) => response.data);
};

export const createSection = (organizationClient, grantId, newGrantSection) => {
  return organizationClient
    .post(`/grants/${grantId}/sections/`, newGrantSection)
    .then((response) => response.data);
};

export const updateSection = (
  organizationClient,
  grantId,
  grantSectionId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/grants/${grantId}/sections/${grantSectionId}`, fieldsToUpdate)
    .then((response) => response.data);
};

export const reorderSection = (
  organizationClient,
  grantId,
  grantSectionId,
  sortOrder
) => {
  return organizationClient
    .patch(`/grants/${grantId}/actions/reorder_section/${grantSectionId}`, {
      sort_order: sortOrder,
    })
    .then((response) => response.data);
};
