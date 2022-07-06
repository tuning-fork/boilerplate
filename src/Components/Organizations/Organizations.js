import React, { useState } from "react";
import { Organization } from "../../resources";
import OrganizationsNew from "./OrganizationsNew";
import OrganizationEditForm from "./OrganizationEditForm";
import OrgSelect from "./OrgSelect";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./Organizations.css";

export default function Organizations() {
  // eslint-disable-next-line no-unused-vars
  const [editingOrganizationId, setEditingOrganizationId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { user } = useCurrentUser();
  const { fetchUserOrganizations } = useCurrentOrganization();
  // eslint-disable-next-line no-unused-vars
  const [currentOrganizationId, setCurrentOrganizationId] = useState();

  const handleAddNewOrganization = async (fields) => {
    await createOrganization(fields, fields);
    await fetchUserOrganizations();
    alert("You have successfully added an organization.");
  };

  // const handleClickEditOrganization = (organizationUuid) => {
  //   setEditingOrganizationId(organizationUuid);
  // };

  const handleEditOrganization = ({ newName }) =>
    updateOrganization({ id: editingOrganizationId }, { name: newName })
      .then(() => console.log("you did it!"))
      .catch((error) => console.error(error));

  // const handleDeleteOrganization = (id) => {
  //   /* eslint-disable-next-line no-restricted-globals */
  //   if (confirm("Are you sure you want to delete this organization?")) {
  //     deleteOrganization({ id })
  //       .catch((error) => console.error(error))
  //       .finally(() => {});
  //   }
  // };

  return (
    <div>
      <OrgSelect />
      <OrganizationsNew
        onSubmit={handleAddNewOrganization}
        onCancel={() => {
          console.log("banana");
        }}
      />

      <OrganizationEditForm
        onSubmit={handleEditOrganization}
        onCancel={() => {
          console.log("banana");
        }}
      />
    </div>
    // <Container className="Organizations">
    //   <Row>
    //     <Col md={8}>
    //       <h1>Organizations</h1>
    //       <b>Organization Name</b>
    //       <ul className="Organizations__List">
    //         {organizations.map((organization) => (
    //           <li key={organization.uuid}>
    //             <Link to={`/organizations/${organization.uuid}`}>
    //               {organization.name}
    //             </Link>
    //             <Button
    //               variant="outline-dark"
    //               onClick={() => handleDeleteOrganization(organization.uuid)}
    //             >
    //               Delete
    //             </Button>
    //             <Button
    //               variant="outline-dark"
    //               onClick={() => handleClickEditOrganization(organization.uuid)}
    //             >
    //               Edit
    //             </Button>
    //           </li>
    //         ))}
    //       </ul>
    //     </Col>
    //   </Row>
    // </Container>
  );
}
