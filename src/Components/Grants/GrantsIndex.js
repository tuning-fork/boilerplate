import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import { Link, useParams, useHistory } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import {
  getAllGrants,
  updateGrant,
} from "../../Services/Organizations/GrantsService";
import formatDate from "../../Helpers/formatDate";
import countWords from "../../Helpers/countWords";
import GrantCopy from "../Grants/GrantCopy";
import "./GrantsIndex.css";
import DeadlineClock from "../design/DeadlineClock/DeadlineClock";
import DropdownMini2 from "../design/DropdownMini2/DropdownMini2";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";

export default function GrantsIndex() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [tabSelect, setTabSelect] = useState("All");
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  // const totalWordCount = countTotalSectionsWords(grant?.sections);
  const currentOrganizationId = currentOrganization.id;
  // const { grant_id: grantId } = useParams();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const columns = [
    {
      Header: "Deadline",
      accessor: (grant) => (
        <>
          <DeadlineClock
            className="GrantsIndex__Table__Deadline"
            deadline={grant.deadline}
          />
          {formatDate(grant.deadline)}
        </>
      ),
    },
    { Header: "Title", accessor: "title" },
    { Header: "Funding Org", accessor: "fundingOrgName" },
    { Header: "Purpose", accessor: "purpose" },
    {
      Header: "Date Created",
      accessor: (grant) => formatDate(grant.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (grant) => (
        <div className="GrantsIndex__Last-Modified-Cell">
          {formatDate(grant.updatedAt)}
          <DropdownMini2
            labelText="Further Actions"
            placeholder="Pick One"
            options={[
              { value: "MARK_AS_SUBMITTED", label: "Mark as Submitted" },
              { value: "MARK_AS_SUCCESSFUL", label: "Mark as Successful" },
              { value: "MARK_AS_ARCHIVED", label: "Archive" },
              { value: "MAKE_A_COPY", label: "Make a Copy" },
            ]}
            onChange={(option) => {
              if (option.value === "MARK_AS_SUCCESSFUL") {
                updateGrant(organizationClient, grant.id, {
                  successful: true,
                })
                  .then((response) => console.log(response.data))
                  .catch((error) => console.log(error));
              } else if (option.value === "MARK_AS_SUBMITTED") {
                updateGrant(organizationClient, grant.id, {
                  submitted: true,
                })
                  .then((response) => console.log(response.data))
                  .catch((error) => console.log(error));
              } else if (option.value === "MARK_AS_ARCHIVED") {
                updateGrant(organizationClient, grant.id, {
                  archived: true,
                })
                  .then((response) => console.log(response.data))
                  .catch((error) => console.log(error));
              } else if (option.value === "MAKE_A_COPY") {
                history.push(
                  buildOrganizationsLink(`/grants/${grant.id}/copy`)
                );
              }
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (organizationClient)
      getAllGrants(organizationClient)
        .then((grants) => {
          setGrants(grants);
          setLoading(false);
        })
        .catch((error) => console.log(error));
  }, [organizationClient]);

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
          return grant;
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
    <section className="GrantsIndex">
      <h1 className="GrantsIndex__HeaderText">All Grants</h1>
      <div className="GrantsIndex__Actions">
        <TextBox
          labelText="Search grants by title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, text: event.target.value })
          }
          className="GrantsIndex__SearchInput"
        />
        <Button
          as={Link}
          to={`/organizations/${currentOrganizationId}/grants-new/`}
        >
          Add New Grant
        </Button>
      </div>
      <div className="GrantsIndex__TableSection">
        <div className="GrantsIndex__TableTabs">
          <Button
            onClick={() => setTabSelect("All")}
            className={clsx(
              "GrantsIndex__TableTabButton",
              tabSelect === "All" && "GrantsIndex__TableTabButton--selected"
            )}
            variant="text"
          >
            All
          </Button>
          <Button
            onClick={() => setTabSelect("Drafts")}
            className={clsx(
              "GrantsIndex__TableTabButton",
              tabSelect === "Drafts" && "GrantsIndex__TableTabButton--selected"
            )}
            variant="text"
          >
            Drafts
          </Button>
          <Button
            onClick={() => setTabSelect("Submitted")}
            className={clsx(
              "GrantsIndex__TableTabButton",
              tabSelect === "Submitted" &&
                "GrantsIndex__TableTabButton--selected"
            )}
            variant="text"
          >
            Submitted
          </Button>
          <Button
            onClick={() => setTabSelect("Successful")}
            className={clsx(
              "GrantsIndex__TableTabButton",
              tabSelect === "Successful" &&
                "GrantsIndex__TableTabButton--selected"
            )}
            variant="text"
          >
            Successful
          </Button>
          <Button
            onClick={() => setTabSelect("Archived")}
            className={clsx(
              "GrantsIndex__TableTabButton",
              tabSelect === "Archived" &&
                "GrantsIndex__TableTabButton--selected"
            )}
            variant="text"
          >
            Archived
          </Button>
        </div>
        <div className="GrantsIndex__Table">
          {filteredGrants.length ? (
            <Table columns={columns} data={filteredGrants} />
          ) : (
            <p>There are no grants for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}
