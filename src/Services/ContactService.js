import apiClient from "../config/apiClient";

export const sendContactSubmission = async (fields) => {
  return apiClient
    .post("/contact_us", {
      name: fields.name,
      title: fields.title,
      email: fields.email,
      organizationName: fields.organization_name,
      message: fields.message,
    })
    .then((response) => response.data);
};
