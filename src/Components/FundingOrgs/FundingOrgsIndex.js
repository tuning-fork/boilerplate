import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import clsx from "clsx";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import FundingOrgNew from "./FundingOrgNew";
import FundingOrgEdit from "./FundingOrgEdit";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import formatDate from "../../Helpers/formatDate";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import "./FundingOrgsIndex.css";

export default function FundingOrgsIndex() {
  const [tabSelect, setTabSelect] = useState("All");
  const [selectedFundingOrg, setSelectedFundingOrg] = useState({});
  const [showingFundingOrgNew, setShowingFundingOrgNew] = useState(false);
  const [showingFundingOrgEdit, setShowingFundingOrgEdit] = useState(false);
  const { organizationClient } = useCurrentOrganization();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const openEditFundingOrg = (fundingOrg) => {
    setShowingFundingOrgEdit(true);
    setSelectedFundingOrg(fundingOrg);
  };

  const {
    data: fundingOrgs,
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery("getFundingOrgs", () =>
    FundingOrgsService.getAllFundingOrgs(organizationClient)
  );

  const { mutate: updateFundingOrg } = useMutation(
    (newFundingOrgFields) =>
      FundingOrgsService.updateFundingOrg(
        organizationClient,
        newFundingOrgFields.id,
        newFundingOrgFields
      ),
    {
      onSuccess: () => {
        alert("Funding Organization edited!");
        refetch();
      },
    }
  );

  const handleDropdownMiniAction = ({ option, fundingOrg }) => {
    try {
      switch (option.value) {
        case "REMOVE_FROM_ARCHIVED":
          updateFundingOrg(organizationClient, fundingOrg.id, {
            archived: false,
          });
          break;
        case "MARK_AS_ARCHIVED":
          updateFundingOrg(organizationClient, fundingOrg.id, {
            archived: true,
          });
          console.log(fundingOrg);
          console.log(fundingOrg.id);
          console.log("banana!");
          break;
        case "EDIT":
          openEditFundingOrg(fundingOrg);
          break;
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
    } catch (error) {
      console.error(error);
    }
    refetch();
  };

  const handleCloseFundingOrgModal = () => {
    setShowingFundingOrgNew(false);
    setShowingFundingOrgEdit(false);
    return fundingOrgs;
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    {
      Header: "Website",
      accessor: (fundingOrg) => (
        <a href={fundingOrg.website} target="_blank" rel="noreferrer">
          {fundingOrg.website?.length > 30
            ? fundingOrg.website?.slice(0, 30) + "..."
            : fundingOrg.website}
        </a>
      ),
    },
    {
      Header: "Date Created",
      accessor: (fundingOrg) => formatDate(fundingOrg.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (fundingOrg) => (
        <div className="fundingorgs-index__last-modified-cell">
          {formatDate(fundingOrg.updatedAt)}
          <DropdownMini
            className="fundingorgs-index__see-more"
            labelText="Further Actions"
            placeholder="Pick One"
            options={[
              fundingOrg.archived
                ? {
                    value: "REMOVE_FROM_ARCHIVED",
                    label: "Remove from Archive",
                  }
                : { value: "MARK_AS_ARCHIVED", label: "Archive" },
              { value: "EDIT", label: "Edit" },
            ]}
            onChange={(option) =>
              handleDropdownMiniAction({ option, fundingOrg })
            }
          />
        </div>
      ),
    },
  ];

  const filteredFundingOrgs = useMemo(() => {
    return fundingOrgs
      .filter((fundingOrgs) => {
        const matchesTitle = fundingOrgs.name
          .toLowerCase()
          .includes(searchFilters.title.toLowerCase());
        return matchesTitle;
      })
      .filter((fundingOrgs) => {
        if (tabSelect === "All") {
          return fundingOrgs.archived === false;
        } else if (tabSelect === "Archived") {
          return fundingOrgs.archived === true;
        }
        return fundingOrgs;
      });
  }, [fundingOrgs, searchFilters, tabSelect]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="fundingorgs-index">
      <h1 className="fundingorgs-index__header-text">All Funding Orgs</h1>
      <div className="fundingorgs-index__actions">
        <TextBox
          labelText="Search Funding Organizations by Title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, title: event.target.value })
          }
          className="fundingorgs-index__search-input"
        />
        <Button onClick={() => setShowingFundingOrgNew(true)}>
          Add New Funding Org
        </Button>
      </div>
      <div className="fundingorgs-index__table-tabs">
        <Button
          onClick={() => setTabSelect("All")}
          className={clsx(
            "fundingorgs-index__table-tab-button",
            tabSelect === "All" &&
              "fundingorgs-index__table-tab-button--selected"
          )}
          variant="text"
        >
          All
        </Button>
        <Button
          onClick={() => setTabSelect("Archived")}
          className={clsx(
            "fundingorgs-index__table-tab-button",
            tabSelect === "Archived" &&
              "fundingorgs-index__table-tab-button--selected"
          )}
          variant="text"
        >
          Archived
        </Button>
      </div>
      <div className="fundingorgs-index__table">
        {filteredFundingOrgs.length ? (
          <Table columns={columns} data={filteredFundingOrgs} />
        ) : (
          <p>There are no funding orgs.</p>
        )}
      </div>
      <FundingOrgNew
        show={showingFundingOrgNew}
        onClose={() => handleCloseFundingOrgModal()}
      />
      <FundingOrgEdit
        fundingOrg={selectedFundingOrg}
        show={showingFundingOrgEdit}
        onClose={() => handleCloseFundingOrgModal()}
      />
    </section>
  );
}
