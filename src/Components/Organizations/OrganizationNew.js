import React from "react";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { Organization } from "../../resources";
import { useFetcher, useResource } from "rest-hooks";
import OrganizationForm from "./OrganizationForm";
import "./OrganizationNew.css";

export default function OrganizationNew(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const createOrganization = useFetcher(Organization.create());

  const handleSubmit = (organizationFields) => {
    createOrganization(organizationClient, {
      ...organizationFields,
      organizationId: currentOrganization.id,
    })
      .then((organization) => {
        if (organization.id) {
          props.onClose();
        }
      })
      .catch((error) => {
        console.error("organization creation error", error);
      });
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Organization"
      className="organization-new"
    >
      <OrganizationForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Modal>
  );
}

// return (
//   <Card>
//     <Card.Header>
//       <h3>Add Organization</h3>
//     </Card.Header>
//     <Card.Body>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group>
//           <Form.Label>Organization Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//             required
//           />
//         </Form.Group>
//         <Button variant="outline-dark" onClick={props.onCancel}>
//           Cancel
//         </Button>
//         <Button variant="dark" type="submit">
//           Add New Organization
//         </Button>
//       </Form>
//     </Card.Body>
//   </Card>
// );
// }
