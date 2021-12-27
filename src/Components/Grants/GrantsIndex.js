import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import clsx from "clsx";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
import Table from "../design/Table/Table";
import { Link, useParams } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { getAllGrants } from "../../Services/Organizations/GrantsService";
import formatDate from "../../Helpers/formatDate";
import countWords from "../../Helpers/countWords";
import SortableElement from "../Elements/SortableElement";
import GrantCopy from "../Grants/GrantCopy";
import "./GrantsIndex.css";

export default function GrantsIndex(props) {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [filteredGrantsByTabName, setFilteredGrantsByTabName] = useState([]);
  const [tabSelect, setTabSelect] = useState("All");
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  // const totalWordCount = countTotalSectionsWords(grant?.sections);
  const currentOrganizationId = currentOrganization.id;
  // const { grant_id: grantId } = useParams();
  const sensors = useSensors(
    useSensor(PointerSensor)
    // This breaks forms nested under drag and drop! The space key triggers
    // this sensor. TODO: Circle back to this!
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const columns = [
    { Header: "Deadline", accessor: (grant) => formatDate(grant.deadline) },
    { Header: "Title", accessor: "title" },
    { Header: "Funding Org", accessor: "fundingOrgName" },
    { Header: "Purpose", accessor: "purpose" },
    {
      Header: "Date Created",
      accessor: (grant) => formatDate(grant.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (grant) => formatDate(grant.updatedAt),
    },
  ];

  const dropDownProps = {
    labelText: "Further Actions",
    placeholder: "Pick One",
    options: [
      { value: "MARK_AS_SUBMITTED", label: "Mark as Submitted" },
      { value: "MARK_AS_SUCCESSFUL", label: "Mark as Successful" },
      { value: "MARK_AS_COPY", label: "Mark as Copy" },
      { value: "ARCHIVE", label: "Archive" },
    ],
  };

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
          {/* dropDownProps={dropDownProps} */}
        </div>
      </div>
    </section>
  );
}
