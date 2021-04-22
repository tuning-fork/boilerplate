import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { countWords } from "../Services/infofunctions";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function SectionsNew(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [boilerplates, setBoilerplates] = useState([]);
  const [currentBoilerplate, setCurrentBoilerplate] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [bios, setBios] = useState([]);
  const [titleArray, setTitleArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/boilerplates`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setBoilerplates(response.data);
      });
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/bios`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setBios(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearchParamSelect = (event) => {
    setFilterParam(event.target.value);
  };

  const onTextChanged = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(event.target.value);
    if (searchValue.length <= 0) {
      setSuggestions([]);
      return;
    }
    if (filterParam === "filterTitle") {
      let filteredByTitle = [];
      filteredByTitle = boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(searchValue) !== -1;
      });
      setSuggestions(filteredByTitle);
      setSearchText(value);
    } else if (filterParam === "filterCategory") {
      let filteredByCategory = [];
      filteredByCategory = boilerplates.filter((boilerplate) => {
        return (
          boilerplate.category_name.toLowerCase().indexOf(searchValue) !== -1
        );
      });
      setSuggestions(filteredByCategory);
      setSearchText(value);
    }
  };

  // const onTextChanged = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   let suggestions = [];
  //   if (value.length > 0) {
  //     suggestions = boilerplates.filter((boilerplate) => {
  //       return boilerplate.title.toLowerCase().indexOf(value) !== -1;
  //     });
  //     console.log(suggestions);
  //   }
  //   setSuggestions(suggestions);
  //   setSearchText(value);
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
      grant_id: props.grant_id,
      title: title,
      text: quillText,
      sort_order: props.sort_number + 1,
      wordcount: countWords(quillText),
    };
    axios
      .post(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants/${props.grant_id}/sections`,
        newSection,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          props.addNewSections(response.data);
          toggleHidden();
          clearForm();
        }
      })
      .catch((error) => {
        console.log("section creation error", error);
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
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Boilerplate to text field below</Form.Label>
                {/* <Form.Group> */}
                {/* <div>
                  <label>Search Boilerplate by title </label>
                  <input
                    type="text"
                    value={searchText}
                    onChange={onTextChanged}
                  />
                  {renderSuggestions()}
                </div> */}
                <Form.Group>
                  <Form.Label>Search Parameter</Form.Label>
                  <Form.Control
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
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search text..."
                    value={searchText}
                    onChange={onTextChanged}
                  />
                </Form.Group>
                {renderSuggestions()}
                {/* </Form.Group> */}
                <Form.Control
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
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Bio Text to text field below</Form.Label>
                <Form.Control
                  as="select"
                  name="currentBoilerplate"
                  value={currentBoilerplate}
                  onChange={handleSelect}
                >
                  <option value="" disabled>
                    Select Bio
                  </option>
                  {bios.map((bio) => {
                    return (
                      <option
                        key={bio.id}
                        value={`${bio.first_name} ${bio.last_name}: ${bio.text}`}
                        onChange={(event) =>
                          setCurrentBoilerplate(event.target.value)
                        }
                      >
                        {`${bio.first_name} ${bio.last_name}`}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Label>Grant Section Text</Form.Label>
              <ReactQuill
                // name="quill_text"
                value={quillText}
                onChange={(value) => setQuillText(value)}
              />
              {/* <Form.Group>
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                    rows="4"
                    cols="50"
                    required
                  ></Form.Control>
                </Form.Group> */}
              <Form.Group>
                <Form.Label>Word Count</Form.Label>
                <p>{countWords(quillText)}</p>
              </Form.Group>
              <div className="text-center">
                <Button type="submit">Submit New Section</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
}
