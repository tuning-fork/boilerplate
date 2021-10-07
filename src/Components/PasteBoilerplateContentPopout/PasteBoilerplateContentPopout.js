import React, { useState, useEffect, useContext, useMemo } from "react";
import TextBox from "../design/TextBox/TextBox";
import AccordionTable from "../design/Accordion/AccordionTable/AccordionTable";
import "./PasteBoilerplateContentPopout.css";
import { PasteBoilerplateContentPopoutContext } from "./PasteBoilerplateContentPopoutContext";
import PasteBoilerplateTextPanel from "./PasteBoilerplateTextPanel";
import CloseIcon from "@material-ui/icons/Close";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { getAllBoilerplates } from "../../Services/Organizations/BoilerplatesService";

export default function PasteBoilerplateContentPopout() {
  const columns = [
    { Header: "Title", accessor: "title" },
    { Header: "Category", accessor: "category_name" },
    { Header: "Word Count", accessor: "wordcount" },
  ];
  const { organizationClient } = useCurrentOrganizationContext();
  const { pasteBoilerplate, setIsOpen } = useContext(
    PasteBoilerplateContentPopoutContext
  );

  const [searchFilters, setSearchFilters] = useState({
    text: "",
    category: "",
    maxWordCount: "",
  });
  const [boilerplates, setBoilerplates] = useState([]);
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

  const filteredBoilerplatesWithPasted = filteredBoilerplates.map(
    (filteredBoilerplate) => ({
      ...filteredBoilerplate,
      wasPasted: false,
    })
  );

  useEffect(() => {
    getAllBoilerplates(organizationClient)
      .then((boilerplates) => {
        setBoilerplates(boilerplates);
      })
      .catch((error) => console.log(error));
  }, [organizationClient]);

  const handleClickPasteBoilerplate = (pastedBoilerplate) => {
    pasteBoilerplate(pastedBoilerplate.text);
    handleWasPasted(pastedBoilerplate.id);
  };

  const handleWasPasted = (id) => {
    filteredBoilerplatesWithPasted.map((filteredBoilerplateWithPasted) => {
      if (filteredBoilerplateWithPasted.id === id) {
        filteredBoilerplateWithPasted.wasPasted = true;
      }
    });
  };

  return (
    <aside className="paste-boilerplate-content-popout">
      <h2 className="heading-3">Paste Boilerplate Content</h2>
      <CloseIcon
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <TextBox
        labelText="Search"
        onChange={(event) =>
          setSearchFilters({ ...searchFilters, text: event.target.value })
        }
      />
      {/* TODO: Category will be a dropdown */}
      <TextBox
        labelText="Category"
        onChange={(event) =>
          setSearchFilters({
            ...searchFilters,
            category: event.target.value,
          })
        }
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
      />
      <AccordionTable
        columns={columns}
        data={filteredBoilerplatesWithPanels}
        handleClickPasteBoilerplate={handleClickPasteBoilerplate}
        handleWasPasted={handleWasPasted}
      />
    </aside>
  );
}
