export const mapSection = (apiSection) => ({
  uuid: apiSection.uuid,
  wordCount: apiSection.wordcount,
  title: apiSection.title,
  text: apiSection.text,
  sortOrder: apiSection.sort_order,
});

export const getSection = (organizationClient, grantUuid, sectionUuid) => {
  return organizationClient
    .get(`/grants/${grantUuid}/sections/${sectionUuid}`)
    .then((response) => response.data);
};

export const getAllSections = (organizationClient, grantUuid) => {
  return organizationClient
    .get(`/grants/${grantUuid}/sections/`)
    .then((response) => response.data);
};

export const deleteSection = (organizationClient, grantUuid, sectionUuid) => {
  return organizationClient
    .delete(`/grants/${grantUuid}/sections/${sectionUuid}`)
    .then((response) => response.data);
};

export const createSection = (
  organizationClient,
  grantUuid,
  newGrantSection
) => {
  return organizationClient
    .post(`/grants/${grantUuid}/sections/`, newGrantSection)
    .then((response) => response.data);
};

export const updateSection = (
  organizationClient,
  grantUuid,
  sectionUuid,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/grants/${grantUuid}/sections/${sectionUuid}`, fieldsToUpdate)
    .then((response) => response.data);
};

export const reorderSection = (
  organizationClient,
  grantUuid,
  sectionUuid,
  sortOrder
) => {
  return organizationClient
    .patch(`/grants/${grantUuid}/actions/reorder_section/${sectionUuid}`, {
      sort_order: sortOrder,
    })
    .then((response) => response.data);
};
