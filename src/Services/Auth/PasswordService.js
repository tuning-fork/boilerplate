import apiClient from "../../config/apiClient";

/**
 * Initiates a password reset for a user, sending them a link to their email.
 * @param {string} email
 */
export async function forgotPassword(email) {
  return apiClient.post("/forgot_password", { email });
}

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
