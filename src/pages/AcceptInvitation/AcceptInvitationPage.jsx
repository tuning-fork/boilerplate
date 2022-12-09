import React, { useMemo } from "react";
import { useMutation } from "react-query";
import { useHistory, Link } from "react-router-dom";
import get from "lodash.get";
import useQuery from "../../Hooks/useQuery";
import Container from "../../Components/design/Container/Container";
import * as InvitationService from "../../Services/Organizations/InvitationsService";
import AcceptInvitationForm from "./AcceptInvitationForm";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import "./AcceptInvitationPage.css";

export default function AcceptInvitationPage() {
  const { login } = useCurrentUser();
  const history = useHistory();
  const query = useQuery();
  const email = useMemo(() => query.get("email"), [query]);
  const token = useMemo(() => query.get("token"), [query]);
  const firstName = useMemo(() => query.get("first_name"), [query]);
  const lastName = useMemo(() => query.get("last_name"), [query]);

  const handleSubmit = (fields) => {
    acceptInvitation(fields);
  };

  const { mutate: acceptInvitation } = useMutation(
    (fields) =>
      InvitationService.acceptInvitation({
        ...fields,
        token,
      }),
    {
      async onSuccess(response, fields) {
        await login(email, fields.password);
        history.push(`/organizations/${response.organizationId}/dashboard`);
      },
      onError(error) {
        console.error(error);

        const errors = get(error, "response.data.errors", []);
        if (errors.some((msg) => msg.match(/password/i))) {
          alert(errors.join("\n"));
        } else {
          alert(
            "Invitation invalid or expired. Please contact your organization administrator to reinvite you."
          );
        }
      },
    }
  );

  return (
    <Container as="section" centered className="accept-invitation">
      {token && email ? (
        <>
          <h1 className="accept-invitation__header">Accept Invitation</h1>
          <p>
            Please fill out the following form fields to accept your invitation
            and create an account.
          </p>
          <AcceptInvitationForm
            onSubmit={handleSubmit}
            firstName={firstName}
            lastName={lastName}
          />
        </>
      ) : (
        <>
          <h1 className="accept-invitation__header">Something went wrong</h1>
          <p>
            The link you provided to accept an invitation is invalid. Please try
            again or contact your organization admin to re-invite you.
          </p>
          <Link to="/splashpage">Go to splashpage.</Link>
        </>
      )}
    </Container>
  );
}
