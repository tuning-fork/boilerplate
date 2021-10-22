import React, { useState, useEffect, useContext, useMemo } from "react";
import TextBox from "../design/TextBox/TextBox";
import Dropdown from "../design/Dropdown/Dropdown";
import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
import "./PasteBoilerplateContentPopout.css";
import { PasteBoilerplateContentPopoutContext } from "./PasteBoilerplateContentPopoutContext";
import PasteBoilerplateTextPanel from "./PasteBoilerplateTextPanel";

import { MdClose } from "react-icons/md";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { getAllBoilerplates } from "../../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";

export default function PasteBoilerplateContentPopout() {
  const columns = [
    { Header: "Title", accessor: "title" },
    { Header: "Category", accessor: "category_name" },
    { Header: "Word Count", accessor: "wordcount" },
  ];
  const { organizationClient } = useCurrentOrganizationContext();
  const { setIsOpen } = useContext(PasteBoilerplateContentPopoutContext);

  const [searchFilters, setSearchFilters] = useState({
    text: "",
    category: "",
    maxWordCount: "",
  });
  const [boilerplates, setBoilerplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const filteredBoilerplates = useMemo(() => {
    return boilerplates.filter((boilerplate) => {
      const matchesTitle = boilerplate.title
        .toLowerCase()
        .includes(searchFilters.text.toLowerCase());
      const matchesCategory =
        boilerplate.category_name.includes(searchFilters.category) ||
        searchFilters.category === "";
      const matchesMaxWordCount =
        boilerplate.wordcount <= searchFilters.maxWordCount ||
        searchFilters.maxWordCount === "";

      return matchesTitle && matchesCategory && matchesMaxWordCount;
    });
  }, [boilerplates, searchFilters]);
  const filteredBoilerplatesWithPanels = useMemo(() => {
    return filteredBoilerplates.map((filteredBoilerplate) => ({
      ...filteredBoilerplate,
      _expandableContent: (
        <PasteBoilerplateTextPanel boilerplate={filteredBoilerplate} />
      ),
    }));
  }, [filteredBoilerplates]);

  useEffect(() => {
    getAllBoilerplates(organizationClient)
      .then((boilerplates) => {
        setBoilerplates(boilerplates);
      })
      .catch((error) => console.log(error));
    getAllCategories(organizationClient)
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => console.log(error));
  }, [organizationClient]);

  return (
    <aside className="paste-boilerplate-content-popout">
      <header className="paste-boilerplate-content-popout__header">
        <h2 className="heading-3">Paste Boilerplate Content</h2>
        <MdClose
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </header>

      <TextBox
        labelText="Search"
        onChange={(event) =>
          setSearchFilters({ ...searchFilters, text: event.target.value })
        }
      />
      <div className="paste-boilerplate-content-popout__secondary-search">
        <Dropdown
          options={categories.map((category) => ({
            value: category.name,
            label: category.name,
          }))}
          labelText="Category"
          onChange={(category) =>
            setSearchFilters({
              ...searchFilters,
              category: category.value,
            })
          }
          value={searchFilters.category}
          className="paste-boilerplate-content-popout__category-search"
        />

        <TextBox
          labelText="Max Word Count"
          type="number"
          onChange={(event) =>
            setSearchFilters({
              ...searchFilters,
              maxWordCount: event.target.value,
            })
          }
          className="paste-boilerplate-content-popout__max-word-count"
        />
      </div>
      <AccordionTable columns={columns} data={filteredBoilerplatesWithPanels} />
    </aside>
  );
}
