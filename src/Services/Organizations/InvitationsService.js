import { isPast, isToday } from "date-fns";
import apiClient from "../../config/apiClient";

export const mapInvitation = (apiInvitation) => ({
  id: apiInvitation.id,
  firstName: apiInvitation.first_name,
  lastName: apiInvitation.last_name,
  email: apiInvitation.email,
  expiresAt: new Date(apiInvitation.expires_at),
  createdAt: new Date(apiInvitation.created_at),
  updatedAt: new Date(apiInvitation.updated_at),
  hasExpired() {
    return isToday(this.expiresAt) || isPast(this.expiresAt);
  },
});

const mapInvitationToApiInvitation = (invitation) => ({
  id: invitation.id,
  email: invitation.email,
  first_name: invitation.firstName,
  last_name: invitation.lastName,
  expires_at: invitation.expiresAt,
  created_at: invitation.createdAt,
  updated_at: invitation.updatedAt,
});

export const getAllInvitations = (organizationClient) => {
  return organizationClient
    .get(`/invitations/`)
    .then((response) => response.data.map(mapInvitation));
};

export const createInvitation = (organizationClient, invitationFields) => {
  return organizationClient
    .post(`/invitations/`, mapInvitationToApiInvitation(invitationFields))
    .then((response) => mapInvitation(response.data));
};

export const acceptInvitation = (fields) => {
  return apiClient
    .post(`/invitations/${fields.token}/accept`, {
      first_name: fields.firstName,
      last_name: fields.lastName,
      password: fields.password,
    })
    .then((response) => ({
      organizationId: response.data.organization_id,
    }));
};

export const reinvite = (organizationClient, invitationId) => {
  return organizationClient
    .post(`/invitations/${invitationId}/reinvite`)
    .then((response) => mapInvitation(response.data));
};

export const deleteInvitation = (organizationClient, invitationId) => {
  return organizationClient
    .delete(`/invitations/${invitationId}`)
    .then((response) => mapInvitation(response.data));
};
