export const mapSection = (apiSection) => ({
  id: apiSection.id,
  wordCount: apiSection.wordcount,
  title: apiSection.title,
  text: apiSection.text,
  sortOrder: apiSection.sort_order,
});

export const getSection = (organizationClient, grantId, sectionId) => {
  return organizationClient
    .get(`/grants/${grantId}/sections/${sectionId}`)
    .then((response) => response.data);
};

export const getAllSections = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}/sections/`)
    .then((response) => response.data);
};

export const deleteSection = (organizationClient, grantId, sectionId) => {
  return organizationClient
    .delete(`/grants/${grantId}/sections/${sectionId}`)
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
  sectionId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/grants/${grantId}/sections/${sectionId}`, fieldsToUpdate)
    .then((response) => response.data);
};

export const reorderSection = (
  organizationClient,
  grantId,
  sectionId,
  sortOrder
) => {
  return organizationClient
    .patch(`/grants/${grantId}/actions/reorder_section/${sectionId}`, {
      sort_order: sortOrder,
    })
    .then((response) => response.data);
};

export const reorderSections = (organizationClient, grantId, sections) => {
  return organizationClient
    .patch(`/grants/${grantId}/actions/reorder_sections`, {
      sections,
    })
    .then((response) => response.data);
};
