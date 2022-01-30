const mapCategory = (apiCategory) => ({
  createdAt: new Date(apiCategory.created_at),
  updatedAt: new Date(apiCategory.updated_at),
  name: apiCategory.name,
  id: apiCategory.id.toString(),
  organizationId: apiCategory.organization_id.toString(),
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
    .post(`/categories/`, newCategory)
    .then((response) => response.data);
};

// updateCategory

export const updateCategory = (
  organizationClient,
  categoryId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/categories/${categoryId}`, fieldsToUpdate)
    .then((response) => response.data);
};
