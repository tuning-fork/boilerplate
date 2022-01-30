import React, { useState, useEffect, useMemo, useCallback } from "react";
import clsx from "clsx";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import { Link, useHistory } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import {
  getAllGrants,
  updateGrant,
} from "../../Services/Organizations/GrantsService";
import formatDate from "../../Helpers/formatDate";
import DeadlineClock from "../design/DeadlineClock/DeadlineClock";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./GrantsIndex.css";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";

export default function GrantsIndex() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [tabSelect, setTabSelect] = useState("All");
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const currentOrganizationId = currentOrganization.id;
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const fetchGrants = useCallback(async () => {
    if (!organizationClient) {
      return;
    }

    try {
      const grants = await getAllGrants(organizationClient);
      setGrants(grants);
    } catch (error) {
      setErrors([error]);
    } finally {
      setLoading(false);
    }
  }, [organizationClient]);

  const handleDropdownMiniAction = async ({ option, grant }) => {
    try {
      switch (option.value) {
        case "REMOVE_FROM_SUBMITTED":
          await updateGrant(organizationClient, grant.id, {
            submitted: false,
          });
          break;
        case "REMOVE_FROM_SUCCESSFUL":
          await updateGrant(organizationClient, grant.id, {
            successful: false,
          });
          break;
        case "REMOVE_FROM_ARCHIVED":
          await updateGrant(organizationClient, grant.id, {
            archived: false,
          });
          break;
        case "MARK_AS_SUCCESSFUL":
          await updateGrant(organizationClient, grant.id, {
            successful: true,
          });
          break;
        case "MARK_AS_SUBMITTED":
          await updateGrant(organizationClient, grant.id, {
            submitted: true,
          });
          break;
        case "MARK_AS_ARCHIVED":
          await updateGrant(organizationClient, grant.id, {
            archived: true,
          });
          break;
        case "MAKE_A_COPY":
          return history.push(
            buildOrganizationsLink(`/grants/${grant.id}/copy`)
          );
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
      await fetchGrants();
    } catch (error) {
      console.error(error);
      setErrors([error]);
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
        <CurrentOrganizationLink to={`/grants/${grant.id}`}>
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

  useEffect(() => {
    fetchGrants();
  }, [fetchGrants]);

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
      });
  }, [grants, searchFilters, tabSelect]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

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
          as={Link}
          to={`/organizations/${currentOrganizationId}/grants-new/`}
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
        >
          Archived
        </Button>
      </div>
      <div className="grants-index__table">
        {filteredGrants.length ? (
          <Table columns={columns} data={filteredGrants} />
        ) : (
          <p>There are no grants for this category.</p>
        )}
      </div>
    </section>
  );
}
