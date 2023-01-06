import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import formatDate from "../../Helpers/formatDate";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import "./BoilerplatesIndex.css";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";

export default function BoilerplatesIndex() {
  const [tabSelect, setTabSelect] = useState("All");
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const {
    data: boilerplates,
    isError,
    isLoading,
    error,
    refetch: refetchBoilerplates,
  } = useQuery("getBoilerplates", () =>
    BoilerplatesService.getAllBoilerplates(organizationClient)
  );

  const { mutate: updateBoilerplate } = useMutation(
    (boilerplateFields) =>
      BoilerplatesService.updateBoilerplate(
        organizationClient,
        boilerplateFields.id,
        boilerplateFields
      ),
    {
      onSuccess() {
        refetchBoilerplates();
      },
    }
  );

  const handleDropdownMiniAction = ({ option, boilerplate }) => {
    switch (option.value) {
      case "REMOVE_FROM_ARCHIVED":
        updateBoilerplate({ id: boilerplate.id, archived: false });
        break;
      case "MARK_AS_ARCHIVED":
        updateBoilerplate({ id: boilerplate.id, archived: true });
        break;
      default:
        console.error(`Unexpected option given ${option.value}!`);
    }
  };

  const columns = [
    {
      Header: "Title",
      accessor: (boilerplate) => (
        <CurrentOrganizationLink to={`/boilerplates/${boilerplate.id}`}>
          {boilerplate.title}
        </CurrentOrganizationLink>
      ),
    },
    { Header: "Category", accessor: "categoryName" },
    { Header: "Word Count", accessor: "wordcount" },
    {
      Header: "Date Created",
      accessor: (boilerplate) => formatDate(boilerplate.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (boilerplate) => (
        <div className="boilerplates-index__Last-Modified-Cell">
          {formatDate(boilerplate.updatedAt)}
          <DropdownMini
            className="grants-index__see-more"
            labelText="Further Actions"
            placeholder="Pick One"
            options={[
              boilerplate.archived
                ? {
                    value: "REMOVE_FROM_ARCHIVED",
                    label: "Remove from Archived",
                  }
                : { value: "MARK_AS_ARCHIVED", label: "Archive" },
            ]}
            onChange={(option) =>
              handleDropdownMiniAction({ option, boilerplate })
            }
          />
        </div>
      ),
    },
  ];

  const filteredBoilerplates = useMemo(() => {
    return boilerplates
      .filter((boilerplate) => {
        const matchesTitle = boilerplate.title
          .toLowerCase()
          .includes(searchFilters.title.toLowerCase());
        return matchesTitle;
      })
      .filter((boilerplate) => {
        if (tabSelect === "All") {
          return boilerplate.archived === false;
        } else if (tabSelect === "Archived") {
          return boilerplate.archived === true;
        }
        return boilerplate;
      });
  }, [boilerplates, searchFilters, tabSelect]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="boilerplates-index">
      <h1>All Boilerplates</h1>
      <div className="boilerplates-index__actions">
        <TextBox
          labelText="Search Boilerplates by Title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, title: event.target.value })
          }
          className="boilerplates-index__search-input"
        />
        <Button
          as={Link}
          to={`/organizations/${currentOrganization.id}/boilerplates-new/`}
        >
          Add New Boilerplate
        </Button>
      </div>
      <div className="boilerplates-index__table-tabs">
        <Button
          onClick={() => setTabSelect("All")}
          className={clsx(
            "boilerplates-index__table-tab-button",
            tabSelect === "All" &&
              "boilerplates-index__table-tab-button--selected"
          )}
          variant="text"
        >
          All
        </Button>
        <Button
          onClick={() => setTabSelect("Archived")}
          className={clsx(
            "boilerplates-index__table-tab-button",
            tabSelect === "Archived" &&
              "boilerplates-index__table-tab-button--selected"
          )}
          variant="text"
        >
          Archived
        </Button>
      </div>
      {filteredBoilerplates.length ? (
        <Table columns={columns} data={filteredBoilerplates} />
      ) : (
        <p>There are no boilerplates to display in this tab.</p>
      )}
    </section>
  );
}
