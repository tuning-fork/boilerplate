import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
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
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { getAllBoilerplates } from "../../Services/Organizations/BoilerplatesService";
import formatDate from "../../Helpers/formatDate";
import countWords from "../../Helpers/countWords";
import SortableElement from "../Elements/SortableElement";
import "./BoilerplatesIndex.css";

export default function BoilerplatesIndex(props) {
  const [boilerplates, setBoilerplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const columns = [
    { Header: "Title", accessor: "title" },
    { Header: "Category", accessor: "category_name" },
    { Header: "Word Count", accessor: "wordcount" },
    { Header: "Date Created", accessor: "created_at" },
    { Header: "Last Modified", accessor: "updated_at" },
  ];

  useEffect(() => {
    if (organizationClient)
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
          console.log(boilerplates);
          setLoading(false);
        })
        .catch((error) => console.log(error));
  }, [organizationClient]);

  const filteredBoilerplates = useMemo(() => {
    return boilerplates.filter((boilerplate) => {
      const matchesTitle = boilerplate.title
        .toLowerCase()
        .includes(searchFilters.title.toLowerCase());
      return matchesTitle;
    });
  }, [boilerplates, searchFilters]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="BoilerplatesIndex">
      <section className="BoilerplatesIndex__Overview">
        <header className="BoilerplatesIndex__Header">
          <h1 className="BoilerplatesIndex__HeaderText">All Boilerplates</h1>
        </header>
      </section>
      <section className="BoilerplatesIndex__Actions">
        {/* <div className="BoilerplatesIndex__SearchBar"> */}
        <TextBox
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, text: event.target.value })
          }
          className="BoilerplatesIndex__SearchInput"
        />
        <Button>
          <Link
            to={`/organizations/${currentOrganizationId}/boilerplates-new/`}
          >
            Add New Boilerplate
          </Link>
        </Button>
        {/* </div> */}
      </section>
      <section className="BoilerplatesIndex__TableSection">
        <div className="BoilerplatesIndex__Table">
          <AccordionTable
            columns={columns}
            data={filteredBoilerplates}
            dropDownProps={false}
          />
        </div>
      </section>
    </div>
  );
}
