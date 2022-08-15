import apiClient from "../../config/apiClient";

/**
 * Resets a user's password using a reset token.
 * @param {object} credentials
 * @param {string} credentials.token
 * @param {string} credentials.email
 * @param {string} credentials.password
 */
export async function resetPassword(credentials) {
  return apiClient.post("/reset_password", credentials);
}
