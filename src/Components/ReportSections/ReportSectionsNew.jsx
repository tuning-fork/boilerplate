import React, { useState, useEffect } from "react";
import Button from "../design/Button/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createReportSection } from "../../services/Organizations/Grants/Reports/ReportSectionsService";
import { getAllBoilerplates } from "../../services/Organizations/BoilerplatesService";

export default function ReportSectionsNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [_text, setText] = useState("");
  const [_sortOrder, setSortOrder] = useState("");
  const [_wordcount, setWordcount] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { currentOrganization, organizationClient } = useCurrentOrganization();

  useEffect(() => {
    if (currentOrganization.id) {
      getAllBoilerplates(organizationClient)
        .then((boilerplates) => {
          setBoilerplates(boilerplates);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [currentOrganization.id, organizationClient]);

  const clearForm = () => {
    setQuillText("");
    setTitle("");
    setText("");
    setSortOrder("");
    setWordcount(0);
    setCurrentBoilerplate("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReportSection = {
      reportId: props.reportId,
      title: title,
      text: quillText,
      sort_order: props.sort_number + 1,
      wordcount: countWords(quillText),
    };
    createReportSection(
      organizationClient,
      props.grantId,
      props.reportId,
      newReportSection
    )
      .then((reportSection) => {
        if (reportSection.data) {
          props.updateReportSections(reportSection);
          clearForm();
        }
      })
      .catch((error) => {
        console.error("section creation error", error);
      });
  };

  const handleSelect = (event) => {
    let selectedQuillText = quillText;
    selectedQuillText += ` ${event.target.value}`;
    setQuillText(selectedQuillText);
  };

  const onTextChanged = (event) => {
    const value = event.target.value.toLowerCase();
    let suggestions = [];
    if (value.length > 0) {
      suggestions = boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(value) !== -1;
      });
    }
    setSuggestions(suggestions);
    setSearchText(value);
  };

  const suggestionSelected = (value) => {
    let addQuillText = quillText;
    addQuillText += value.text;
    setSearchText("");
    setSuggestions([]);
    setQuillText(addQuillText);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {suggestions.map((boilerplate) => (
          <li
            key={boilerplate.id}
            onClick={() => suggestionSelected(boilerplate)}
          >
            {boilerplate.title}, {boilerplate.wordcount} words
          </li>
        ))}
      </div>
    );
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <header>
        <h3>New Report Section:</h3>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div>
            <label>Add Boilerplate to Text Area</label>
            <div>
              <label>Search Boilerplate by title </label>
              <input type="text" value={searchText} onChange={onTextChanged} />
              {renderSuggestions()}
            </div>
            <input
              as="select"
              name="currentBoilerplate"
              value={currentBoilerplate}
              onChange={handleSelect}
            >
              <option value="" disabled>
                Select Boilerplate
              </option>
              {boilerplates.map((boilerplate) => {
                return (
                  <option
                    key={boilerplate.id}
                    value={boilerplate.text}
                    onChange={(event) =>
                      setCurrentBoilerplate(event.target.value)
                    }
                  >
                    {boilerplate.title}
                  </option>
                );
              })}
            </input>
          </div>
          <label>Report Section Text</label>
          <ReactQuill
            value={quillText}
            onChange={(value) => setQuillText(value)}
          />
          <div>
            <label>Word Count</label>
            <p>{countWords(quillText)}</p>
          </div>
          <div className="text-center">
            <Button type="submit">Add New Report Section</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
