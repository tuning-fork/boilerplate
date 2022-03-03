import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useFetcher, useResource } from "rest-hooks";
// import { Container, Row, Col, Button } from "react-bootstrap";
import { Organization } from "../../resources";
import OrganizationNew from "./OrganizationNew";
import OrganizationEditForm from "./OrganizationEditForm";
import OrgSelect from "./OrgSelect";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./Organizations.css";
import Button from "../design/Button/Button";
// import TextBox from "../design/TextBox/TextBox";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import formatDate from "../../Helpers/formatDate";
import Table from "../design/Table/Table";

export default function Organizations() {
  const [editingOrganizationId, setEditingOrganizationId] = useState(null);
  const organizations = useResource(Organization.list(), {});
  const createOrganization = useFetcher(Organization.create());
  const updateOrganization = useFetcher(Organization.update());
  const deleteOrganization = useFetcher(Organization.delete());
  const { user } = useCurrentUser();
  const { fetchUserOrganizations } = useCurrentOrganization();
  const [currentOrganizationId, setCurrentOrganizationId] = useState();
  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [showingOrganizationNew, setShowingOrganizationNew] = useState(false);
  const [showingOrganizationEdit, setShowingOrganizationEdit] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleAddNewOrganization = async (fields) => {
    await createOrganization(fields, fields);
    await fetchUserOrganizations();
    alert("You have successfully added an organization.");
  };

  const openEditOrganization = (organization) => {
    setShowingOrganizationEdit(true);
    setSelectedOrganization(organization);
  };

  const handleClickEditOrganization = (organizationId) => {
    setEditingOrganizationId(organizationId);
  };

  const handleEditOrganization = ({ newName }) =>
    updateOrganization({ id: editingOrganizationId }, { name: newName })
      .then(() => console.log("you did it! banana"))
      .catch((error) => console.error(error));

  const handleDeleteOrganization = (id) => {
    /* eslint-disable-next-line no-restricted-globals */
    if (confirm("Are you sure you want to delete this organization?")) {
      deleteOrganization({ id })
        .catch((error) => console.error(error))
        .finally(() => {});
    }
  };

  const handleDropdownMiniAction = async ({ option, organization }) => {
    try {
      switch (option.value) {
        case "EDIT":
          openEditOrganization(organization);
          break;
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
      await fetchUserOrganizations();
    } catch (error) {
      console.error(error);
      setErrors([error]);
    }
  };

  const handleCloseOrganizationModal = () => {
    setShowingOrganizationNew(false);
    setShowingOrganizationEdit(false);
    return fetchUserOrganizations();
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    {
      Header: "Date Created",
      accessor: (organization) => formatDate(organization.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (organization) => (
        <div className="organizations-index__last-modified-cell">
          {formatDate(organization.updatedAt)}
          <DropdownMini
            className="organizations-index__see-more"
            labelText="Further Actions"
            placeholder="Pick One"
            options={[{ value: "EDIT", label: "Edit" }]}
            onChange={(option) =>
              handleDropdownMiniAction({ option, organization })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div>
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
      <section className="categories-index">
        <h1>{user.firstName}'s Organizations</h1>
        <div className="categories-index__actions">
          <Button onClick={() => setShowingOrganizationNew(true)}>
            Add New Organization
          </Button>
        </div>
        <div className="categories-index__table">
          {organizations.length ? (
            <Table columns={columns} data={organizations} />
          ) : (
            <p>
              You have not added any organizations yet, so there are no
              organizations to display in this table.
            </p>
          )}
        </div>
        <OrganizationNew
          show={showingOrganizationNew}
          onClose={handleCloseOrganizationModal}
        />
        <OrganizationEditForm
          category={selectedOrganization}
          show={showingOrganizationEdit}
          onClose={handleCloseOrganizationModal}
        />
      </section>
    </div>
  );
}
