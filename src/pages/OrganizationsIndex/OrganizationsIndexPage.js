// import React, { useState } from "react";
// import { useFetcher, useResource } from "rest-hooks";
// import { Organization } from "../../resources";
// import OrganizationsNew from "./OrganizationsNew";
// import OrganizationEditForm from "./OrganizationEditForm";
// import OrgSelect from "./OrgSelect";
// import { useCurrentUser } from "../../../contexts/currentUserContext";
// import { useCurrentOrganization } from "../../../contexts/currentOrganizationContext";
// import "./OrganizationsIndexPage.css";

export default function OrganizationsIndexPage() {
  // // eslint-disable-next-line no-unused-vars
  // const [editingOrganizationId, setEditingOrganizationId] = useState(null);
  // //change organizations useResource to React-query when react-query ticket is merged in
  // // eslint-disable-next-line no-unused-vars
  // const organizations = useResource(Organization.list(), {});
  // const createOrganization = useFetcher(Organization.create());
  // const updateOrganization = useFetcher(Organization.update());
  // // eslint-disable-next-line no-unused-vars
  // const deleteOrganization = useFetcher(Organization.delete());
  // // eslint-disable-next-line no-unused-vars
  // const { user } = useCurrentUser();
  // const { fetchUserOrganizations } = useCurrentOrganization();
  // // eslint-disable-next-line no-unused-vars
  // const [currentOrganizationId, setCurrentOrganizationId] = useState();
  // const handleAddNewOrganization = async (fields) => {
  //   await createOrganization(fields, fields);
  //   await fetchUserOrganizations();
  //   alert("You have successfully added an organization.");
  // };
  // // const handleClickEditOrganization = (organizationId) => {
  // //   setEditingOrganizationId(organizationId);
  // // };
  // const handleEditOrganization = ({ newName }) =>
  //   updateOrganization({ id: editingOrganizationId }, { name: newName })
  //     .then(() => console.log("you did it!"))
  //     .catch((error) => console.error(error));
  // // const handleDeleteOrganization = (id) => {
  // //   /* eslint-disable-next-line no-restricted-globals */
  // //   if (confirm("Are you sure you want to delete this organization?")) {
  // //     deleteOrganization({ id })
  // //       .catch((error) => console.error(error))
  // //       .finally(() => {});
  // //   }
  // // };
  // return (
  //   <div>
  //     <OrgSelect />
  //     <OrganizationsNew
  //       onSubmit={handleAddNewOrganization}
  //       onCancel={() => {
  //         console.log("banana");
  //       }}
  //     />
  //     <OrganizationEditForm
  //       onSubmit={handleEditOrganization}
  //       onCancel={() => {
  //         console.log("banana");
  //       }}
  //     />
  //   </div>
  //   // <Container className="Organizations">
  //   //   <Row>
  //   //     <Col md={8}>
  //   //       <h1>Organizations</h1>
  //   //       <b>Organization Name</b>
  //   //       <ul className="Organizations__List">
  //   //         {organizations.map((organization) => (
  //   //           <li key={organization.id}>
  //   //             <Link to={`/organizations/${organization.id}`}>
  //   //               {organization.name}
  //   //             </Link>
  //   //             <Button
  //   //               variant="outline-dark"
  //   //               onClick={() => handleDeleteOrganization(organization.id)}
  //   //             >
  //   //               Delete
  //   //             </Button>
  //   //             <Button
  //   //               variant="outline-dark"
  //   //               onClick={() => handleClickEditOrganization(organization.id)}
  //   //             >
  //   //               Edit
  //   //             </Button>
  //   //           </li>
  //   //         ))}
  //   //       </ul>
  //   //     </Col>
  //   //   </Row>
  //   // </Container>
  // );
}
