import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import formatDate from "../../Helpers/formatDate";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./BoilerplatesIndex.css";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";

export default function BoilerplatesIndex() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const {
    data: boilerplates,
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery("getBoilerplates", () =>
    BoilerplatesService.getAllBoilerplates(organizationClient)
  );

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
        </div>
      ),
    },
  ];

  const filteredBoilerplates = useMemo(() => {
    return boilerplates.filter((boilerplate) => {
      const matchesTitle = boilerplate.title
        .toLowerCase()
        .includes(searchFilters.title.toLowerCase());
      return matchesTitle;
    });
  }, [boilerplates, searchFilters]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const openBoilerplateShow = (row) => {
    history.push(buildOrganizationsLink(`/boilerplates/${row.original.id}`));
  };

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
          Add New Boilerplates
        </Button>
      </div>
      {filteredBoilerplates.length ? (
        <Table
          columns={columns}
          data={filteredBoilerplates}
          onRowClick={openBoilerplateShow}
        />
      ) : (
        <p>No boilerplates found.</p>
      )}
    </section>
  );
}
