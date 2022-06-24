const mapCategory = (apiCategory) => ({
  createdAt: new Date(apiCategory.created_at),
  updatedAt: new Date(apiCategory.updated_at),
  name: apiCategory.name,
  archived: apiCategory.archived,
  id: apiCategory.id.toString(),
  organizationUuid: apiCategory.organization_uuid,
});

const mapCategoryToApiCategory = (category) => ({
  ...category,
  organization_id: category.organizationUuid,
});

// getCategory
export const getCategory = (organizationClient, categoryId) => {
  return organizationClient
    .get(`/categories/${categoryId}`)
    .then((response) => response.data);
};

// listCategories

export const getAllCategories = (organizationClient) => {
  return organizationClient
    .get(`/categories/`)
    .then((response) => response.data.map(mapCategory));
};

// deleteCategory

export const deleteCategory = (organizationClient, categoryId) => {
  return organizationClient
    .delete(`/categories/${categoryId}`)
    .then((response) => response.data);
};

// createCategory

export const createCategory = (organizationClient, newCategory) => {
  return organizationClient
    .post(`/categories/`, mapCategoryToApiCategory(newCategory))
    .then((response) => response.data);
};

// updateCategory

export const updateCategory = (
  organizationClient,
  categoryId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/categories/${categoryId}`,
      mapCategoryToApiCategory(fieldsToUpdate)
    )
    .then((response) => response.data);
};
