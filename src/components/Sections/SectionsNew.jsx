import React, { useState, useEffect } from "react";
import Button from "../design/Button/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganization } from "../../contexts/currentOrganizationContext";
import { createGrantSection } from "../../services/Organizations/Grants/GrantSectionsService";
import { getAllBoilerplates } from "../../services/Organizations/BoilerplatesService";
import countWords from "../../Helpers/countWords";

export default function SectionsNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [_text, setText] = useState("");
  const [_sortOrder, setSortOrder] = useState("");
  const [_wordcount, setWordcount] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterParam, setFilterParam] = useState("");

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

  const handleSearchParamSelect = (event) => {
    setFilterParam(event.target.value);
  };

  const onTextChanged = (event) => {
    const searchValue = event.target.value.toLowerCase();
    let suggestions = [];
    if (searchValue.length <= 0) {
      suggestions = boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(searchValue) !== -1;
      });
    }
    setSuggestions(suggestions);
    setSearchText(searchValue);
  };

  // const onTextChanged = (event) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   let combinedBoilerplates = boilerplates.map((boilerplate) => {
  //     (...boilerplate, combined: `${boilerplate.title} ${boilerplatetext})`;
  //   });
  //   let suggestions = [];
  //   if (searchValue.length <= 0) {
  //     suggestions = combinedBoilerplates.filter((combinedBoilerplate) => {
  //       return (
  //         combinedBoilerplate.combined.toLowerCase().indexOf(searchValue) !== -1
  //       );
  //     });
  //   }
  //   setSuggestions(suggestions);
  //   setSearchText(searchValue);
  // };

  const clearForm = () => {
    setQuillText("");
    setTitle("");
    setText("");
    setSortOrder("");
    setWordcount("");
    setCurrentBoilerplate("");
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSection = {
      grantId: props.grantId,
      title: title,
      text: quillText,
      sort_order: props.sort_number + 1,
      wordcount: countWords(quillText),
    };
    createGrantSection(organizationClient, props.grantId, newSection)
      .then((section) => {
        if (section) {
          props.addNewSections(section);
          toggleHidden();
          clearForm();
        }
      })
      .catch((error) => {
        console.error("section creation error", error);
      });
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

  const handleSelect = (event) => {
    let selectedQuillText = quillText;
    selectedQuillText += ` ${event.target.value}`;
    setQuillText(selectedQuillText);
  };

  return (
    <div>
      {isHidden ? (
        <Button onClick={toggleHidden}>Add Section</Button>
      ) : (
        <Button onClick={toggleHidden}>Close</Button>
      )}
      <br />
      <br />
      {!isHidden ? (
        <div>
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
                <label>Add Boilerplate to text field below</label>
                {/* <div> */}
                {/* <div>
                  <label>Search Boilerplate by title </label>
                  <input
                    type="text"
                    value={searchText}
                    onChange={onTextChanged}
                  />
                  {renderSuggestions()}
                </div> */}
                <div>
                  <label>Search Parameter</label>
                  <input
                    as="select"
                    name="filterParam"
                    value={filterParam}
                    onChange={handleSearchParamSelect}
                    required
                  >
                    <option value="" disabled>
                      Search By
                    </option>
                    <option value="filterTitle">Title</option>
                    <option value="filterCategory">Category</option>
                  </input>
                </div>
                <div>
                  <label></label>
                  <input
                    type="text"
                    placeholder="Search text..."
                    value={searchText}
                    onChange={onTextChanged}
                  />
                </div>
                {renderSuggestions()}
                {/* </div> */}
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
              <label>Grant Section Text</label>
              <ReactQuill
                value={quillText}
                onChange={(value) => setQuillText(value)}
              />
              <div>
                <label>Word Count</label>
                <p>{countWords(quillText)}</p>
              </div>
              <div className="text-center">
                <Button type="submit">Submit New Section</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
