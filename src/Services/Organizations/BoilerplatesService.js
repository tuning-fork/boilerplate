const mapBoilerplate = (apiBoilerplate) => ({
  archived: apiBoilerplate.archived,
  createdAt: new Date(apiBoilerplate.created_at),
  categoryId: apiBoilerplate.category_id.toString(),
  categoryName: apiBoilerplate.category_name,
  id: apiBoilerplate.id.toString(),
  organizationId: apiBoilerplate.organization_id.toString(),
  title: apiBoilerplate.title,
  text: apiBoilerplate.text,
  wordcount: apiBoilerplate.wordcount,
  updatedAt: new Date(apiBoilerplate.updated_at),
});

const mapBoilerplateToApiBoilerplate = (boilerplate) => ({
  ...boilerplate,
  category_id: boilerplate.categoryId,
  organization_id: boilerplate.organizationId,
});

// getBoilerplate
export const getBoilerplate = (organizationClient, boilerplateId) => {
  return organizationClient
    .get(`/boilerplates/${boilerplateId}`)
    .then((response) => mapBoilerplate(response.data));
};

// listBoilerplates

export const getAllBoilerplates = (organizationClient) => {
  return organizationClient
    .get(`/boilerplates/`)
    .then((response) => response.data.map(mapBoilerplate));
};

// deleteBoilerplate

export const deleteBoilerplate = (organizationClient, boilerplateId) => {
  return organizationClient
    .delete(`/boilerplates/${boilerplateId}`)
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
  boilerplateId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/boilerplates/${boilerplateId}`,
      mapBoilerplateToApiBoilerplate(fieldsToUpdate)
    )
    .then((response) => response.data);
};

// copyGrant
// not implemented yet

// export const copyBoilerplate = (
//   organizationClient,
//   boilerplateId,
//   copyBoilerplateFields
// ) => {
//   return organizationClient
//     .post(
//       `/boilerplates/${boilerplateId}/copy`,
//       mapBoilerplateToApiBoilerplate(copyBoilerplateFields)
//     )
//     .then((response) => response.data);
// };
