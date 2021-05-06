// getCategory
export const getCategory = (organizationService, categoryId) => {
  return organizationService
    .get(`/categories/${categoryId}`)
    .then((response) => response.data);
};

// listCategories

export const getAllCategories = (organizationService) => {
  return organizationService
    .get(`/categories/`)
    .then((response) => response.data);
};

// deleteCategory

export const deleteCategory = (organizationService) => {
  return organizationService
    .delete(`/categories/`)
    .then((response) => response.data);
};

// createCategory

export const createCategory = (organizationService) => {
  return organizationService
    .post(`/categories/`)
    .then((response) => response.data);
};

// updateCategory

export const updateCategory = (
  organizationService,
  categoryId,
  fieldsToUpdate
) => {
  return organizationService
    .patch(`/categories/${categoryId}`, fieldsToUpdate)
    .then((response) => response.data);
};
