const mapBoilerplate = (apiBoilerplate) => ({
  archived: apiBoilerplate.archived,
  createdAt: new Date(apiBoilerplate.created_at),
  categoryUuid: apiBoilerplate.category_uuid,
  categoryName: apiBoilerplate.category_name,
  uuid: apiBoilerplate.uuid,
  organizationUuid: apiBoilerplate.organization_uuid,
  title: apiBoilerplate.title,
  text: apiBoilerplate.text,
  wordcount: apiBoilerplate.wordcount,
  updatedAt: new Date(apiBoilerplate.updated_at),
});

const mapBoilerplateToApiBoilerplate = (boilerplate) => ({
  ...boilerplate,
  category_id: boilerplate.categoryUuid,
  organization_id: boilerplate.organizationUuid,
});

// getBoilerplate
export const getBoilerplate = (organizationClient, boilerplateUuid) => {
  return organizationClient
    .get(`/boilerplates/${boilerplateUuid}`)
    .then((response) => mapBoilerplate(response.data));
};

// listBoilerplates

export const getAllBoilerplates = (organizationClient) => {
  return organizationClient
    .get(`/boilerplates/`)
    .then((response) => response.data.map(mapBoilerplate));
};

// deleteBoilerplate

export const deleteBoilerplate = (organizationClient, boilerplateUuid) => {
  return organizationClient
    .delete(`/boilerplates/${boilerplateUuid}`)
    .then((response) => response.data);
};

// createBoilerplate

export const createBoilerplate = (organizationClient, newBoilerplate) => {
  return organizationClient
    .post(`/boilerplates/`, mapBoilerplateToApiBoilerplate(newBoilerplate))
    .then((response) => response.data);
};

// updateBoilerplate

export const updateBoilerplate = (
  organizationClient,
  boilerplateUuid,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/boilerplates/${boilerplateUuid}`,
      mapBoilerplateToApiBoilerplate(fieldsToUpdate)
    )
    .then((response) => response.data);
};

// copyBoilerplate
// not implemented yet

// export const copyBoilerplate = (
//   organizationClient,
//   boilerplateUuid,
//   copyBoilerplateFields
// ) => {
//   return organizationClient
//     .post(
//       `/boilerplates/${boilerplateUuid}/copy`,
//       mapBoilerplateToApiBoilerplate(copyBoilerplateFields)
//     )
//     .then((response) => response.data);
// };
