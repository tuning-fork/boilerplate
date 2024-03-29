import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import clsx from "clsx";
import { Button } from "@mantine/core";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import { Link, useHistory } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import formatDate from "../../Helpers/formatDate";
import DeadlineClock from "../design/DeadlineClock/DeadlineClock";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./GrantsIndex.css";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";

export default function GrantsIndex() {
  const [tabSelect, setTabSelect] = useState("All");
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const { data: grants, refetch: refetchGrants } = useQuery("getGrants", () =>
    GrantsService.getAllGrants(organizationClient)
  );

  const { mutate: updateGrant } = useMutation(
    (grantFields) =>
      GrantsService.updateGrant(
        organizationClient,
        grantFields.id,
        grantFields
      ),
    {
      onSuccess() {
        refetchGrants();
      },
    }
  );

  const handleDropdownMiniAction = async ({ option, grant }) => {
    try {
      switch (option.value) {
        case "REMOVE_FROM_SUBMITTED":
          updateGrant({ id: grant.id, submitted: false });
          break;
        case "REMOVE_FROM_SUCCESSFUL":
          updateGrant({ id: grant.id, successful: false });
          break;
        case "REMOVE_FROM_ARCHIVED":
          updateGrant({ id: grant.id, archived: false });
          break;
        case "MARK_AS_SUCCESSFUL":
          updateGrant({ id: grant.id, successful: true });
          break;
        case "MARK_AS_SUBMITTED":
          updateGrant({ id: grant.id, submitted: true });
          break;
        case "MARK_AS_ARCHIVED":
          updateGrant({ id: grant.id, archived: true });
          break;
        case "MAKE_A_COPY":
          return history.push(
            buildOrganizationsLink(`/grants/${grant.id}/copy`)
          );
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      Header: "Deadline",
      accessor: (grant) => (
        <>
          <DeadlineClock
            className="grants-index__table__deadline"
            deadline={grant.deadline}
          />
          {formatDate(grant.deadline)}
        </>
      ),
    },
    {
      Header: "Title",
      accessor: (grant) => (
        <CurrentOrganizationLink
          to={`/grants/${grant.id}`}
          data-testid={grant.title}
        >
          {grant.title}
        </CurrentOrganizationLink>
      ),
    },
    { Header: "Funding Org", accessor: "fundingOrgName" },
    {
      Header: "RFP URL",
      accessor: (grant) => (
        <a href={grant.rfpUrl} target="_blank" rel="noreferrer">
          {grant.rfpUrl?.length > 20
            ? grant.rfpUrl?.slice(0, 20) + "..."
            : grant.rfpUrl}
        </a>
      ),
    },
    { Header: "Purpose", accessor: "purpose" },
    {
      Header: "Date Created",
      accessor: (grant) => formatDate(grant.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (grant) => (
        <div className="grants-index__last-modified-cell">
          {formatDate(grant.updatedAt)}
          <DropdownMini
            className="grants-index__see-more"
            labelText="Further Actions"
            placeholder="Pick One"
            options={[
              grant.submitted
                ? {
                    value: "REMOVE_FROM_SUBMITTED",
                    label: "Remove from Submitted",
                  }
                : { value: "MARK_AS_SUBMITTED", label: "Mark as Submitted" },
              grant.successful
                ? {
                    value: "REMOVE_FROM_SUCCESSFUL",
                    label: "Remove from Successful",
                  }
                : { value: "MARK_AS_SUCCESSFUL", label: "Mark as Successful" },
              grant.archived
                ? {
                    value: "REMOVE_FROM_ARCHIVED",
                    label: "Remove from Archived",
                  }
                : { value: "MARK_AS_ARCHIVED", label: "Archive" },
              { value: "MAKE_A_COPY", label: "Make a Copy" },
            ]}
            onChange={(option) => handleDropdownMiniAction({ option, grant })}
          />
        </div>
      ),
    },
  ];

  const filteredGrants = useMemo(() => {
    return grants
      .filter((grant) => {
        const matchesTitle = grant.title
          .toLowerCase()
          .includes(searchFilters.title.toLowerCase());
        return matchesTitle;
      })
      .filter((grant) => {
        if (tabSelect === "All") {
          return grant.archived === false;
        } else if (tabSelect === "Archived") {
          return grant.archived === true;
        } else if (tabSelect === "Drafts") {
          return grant.submitted === false;
        } else if (tabSelect === "Successful") {
          return grant.successful === true;
        } else if (tabSelect === "Submitted") {
          return grant.submitted === true;
        }
        return grant;
      })
      .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  }, [grants, searchFilters, tabSelect]);

  return (
    <section className="grants-index">
      <h1>All Grants</h1>
      <div className="grants-index__actions">
        <TextBox
          labelText="Search Grants by Title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, title: event.target.value })
          }
          className="grants-index__search-input"
        />
        <Button
          component={Link}
          to={`/organizations/${currentOrganization.id}/grants-new/`}
        >
          Add New Grant
        </Button>
      </div>
      <div className="grants-index__table-tabs">
        <Button
          onClick={() => setTabSelect("All")}
          className={clsx(
            "grants-index__table-tab-button",
            tabSelect === "All" && "grants-index__table-tab-button--selected"
          )}
          variant="text"
          data-testid="all-button"
        >
          All
        </Button>
        <Button
          onClick={() => setTabSelect("Drafts")}
          className={clsx(
            "grants-index__table-tab-button",
            tabSelect === "Drafts" && "grants-index__table-tab-button--selected"
          )}
          variant="text"
          data-testid="drafts-button"
        >
          Drafts
        </Button>
        <Button
          onClick={() => setTabSelect("Submitted")}
          className={clsx(
            "grants-index__table-tab-button",
            tabSelect === "Submitted" &&
              "grants-index__table-tab-button--selected"
          )}
          variant="text"
          data-testid="submitted-button"
        >
          Submitted
        </Button>
        <Button
          onClick={() => setTabSelect("Successful")}
          className={clsx(
            "grants-index__table-tab-button",
            tabSelect === "Successful" &&
              "grants-index__table-tab-button--selected"
          )}
          variant="text"
          data-testid="successful-button"
        >
          Successful
        </Button>
        <Button
          onClick={() => setTabSelect("Archived")}
          className={clsx(
            "grants-index__table-tab-button",
            tabSelect === "Archived" &&
              "grants-index__table-tab-button--selected"
          )}
          variant="text"
          data-testid="archived-button"
        >
          Archived
        </Button>
      </div>
      <div className="grants-index__table">
        {filteredGrants.length ? (
          <Table columns={columns} data={filteredGrants} />
        ) : (
          <p>There are no grants to display in this tab.</p>
        )}
      </div>
    </section>
  );
}
