import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Modal from "../Elements/Modal";
import Container from "../design/Container/Container";
import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
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
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
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
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  // const totalWordCount = countTotalSectionsWords(grant?.sections);
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;
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
    { Header: "Deadline", accessor: "deadline" },
    { Header: "Title", accessor: "title" },
    { Header: "Funding Org", accessor: "funding_org_name" },
    { Header: "Purpose", accessor: "purpose" },
    { Header: "Date Created", accessor: "created_at" },
    { Header: "Last Modified", accessor: "updated_at" },
  ];

  console.log("grants", grants);

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
    return grants.filter((grant) => {
      const matchesTitle = grant.title
        .toLowerCase()
        .includes(searchFilters.title.toLowerCase());
      return matchesTitle;
    });
  }, [grants, searchFilters]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="GrantsIndex">
      <section className="GrantsIndex__Overview">
        <header className="GrantsIndex__Header">
          <h1 className="GrantsIndex__HeaderText">All Grants</h1>
          <div className="GrantsIndex__Actions">
            <Button>
              <Link to={`/organizations/${currentOrganizationId}/grants-new/`}>
                Copy
              </Link>
            </Button>
          </div>
        </header>
        <div className="GrantsIndex__SearchBar">
          <TextBox
            // labelText="Search"
            search
            onChange={(event) =>
              setSearchFilters({ ...searchFilters, text: event.target.value })
            }
            className="GrantsIndex__SearchInput"
          />
        </div>
      </section>
      <section className="GrantsIndex__TableSection">
        <div className="GrantsIndex__Table">
          <AccordionTable columns={columns} data={filteredGrants} />
        </div>
      </section>
    </div>
  );
}
