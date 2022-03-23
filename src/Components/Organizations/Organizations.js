import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import OrganizationNew from "./OrganizationNew";
import OrganizationEdit from "./OrganizationEdit";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./Organizations.css";
import Button from "../design/Button/Button";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import formatDate from "../../Helpers/formatDate";
import Table from "../design/Table/Table";
import UserLayout from "../Layouts/UserLayout/UserLayout";

export default function Organizations() {
  const history = useHistory();
  const { organizations } = useCurrentOrganization();
  const { user } = useCurrentUser();
  const { fetchUserOrganizations, fetchCurrentOrganization } =
    useCurrentOrganization();
  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [showingOrganizationNew, setShowingOrganizationNew] = useState(false);
  const [showingOrganizationEdit, setShowingOrganizationEdit] = useState(false);
  const [errors, setErrors] = useState([]);

  const openEditOrganization = (organization) => {
    setShowingOrganizationEdit(true);
    setSelectedOrganization(organization);
  };

  const handleDropdownMiniAction = async ({ option, organization }) => {
    try {
      switch (option.value) {
        case "EDIT":
          openEditOrganization(organization);
          break;
        case "DASHBOARD":
          await fetchCurrentOrganization(organization.id);
          history.push(`/organizations/${organization.id}/dashboard`);
          break;
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
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
            options={[
              { value: "EDIT", label: "Edit" },
              { value: "DASHBOARD", label: "Go to dashboard" },
            ]}
            onChange={(option) =>
              handleDropdownMiniAction({ option, organization })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <UserLayout>
        <div>
          <section className="organizations-index">
            <h1>{user.firstName}'s Organizations</h1>
            <div className="organizations-index__actions">
              <Button onClick={() => setShowingOrganizationNew(true)}>
                Add New Organization
              </Button>
            </div>
            <div className="organizations-index__table">
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
            <OrganizationEdit
              organization={selectedOrganization}
              show={showingOrganizationEdit}
              onClose={handleCloseOrganizationModal}
            />
          </section>
        </div>
      </UserLayout>
    </>
  );
}
