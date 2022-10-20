const mapInvitation = (apiInvitation) => ({
  id: apiInvitation.id,
  firstName: apiInvitation.first_name,
  lastName: apiInvitation.last_name,
  email: apiInvitation.email,
  expiresAt: new Date(apiInvitation.expires_at),
  createdAt: new Date(apiInvitation.created_at),
  updatedAt: new Date(apiInvitation.updated_at),
});

// TODO: use with create invitation
// eslint-disable-next-line
const mapInvitationToApiInvitation = (invitation) => ({
  ...invitation,
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
