import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoilerplatesNew from "./BoilerplatesNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Button from 'react-bootstrap/Button';

export default function Boilerplates() {
  // constructor(props) {
  //   super(props);

  const [loading, setLoading] = useState(true);
  const [boilerplates, setBoilerplates] = useState([]);
  const [filteredBoilerplates, setFilteredBoilerplates] = useState([]);
  const [isHiddenNew, setIsHiddenNew] = useState(true);
  const [isHiddenCategoriesNew, setIsHiddenCategoriesNew] = useState(true);
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterParam, setFilterParam] = useState("");
  const [filteredByWordCount, setFilteredByWordCount] = useState([]);
  const [openIndex, setOpenIndex] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    axios
      .get("/api/boilerplates", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        // const zippyBoilerplates = this.createUnzipped(response.data);
        // console.log(zippyBoilerplates);
        setBoilerplates(response.data);
        setFilteredBoilerplates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const updateBoilerplates = (newBoilerplate) => {
    const newBoilerplates = [...boilerplates];
    newBoilerplates.push(newBoilerplate);
    setBoilerplates(newBoilerplates);
  };

  const handleSearchParamSelect = (event) => {
    setFilterParam(event.target.value);
  };

  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(event.target.value);
    if (searchValue.length <= 0) {
      setFilteredBoilerplates(boilerplates);
      return;
    }
    if (filterParam === "filterWordCount") {
      console.log(searchValue, "wordcount filter");
      let filteredByWordCount = [];
      filteredByWordCount = boilerplates.filter(
        (boilerplate) => boilerplate.wordcount < searchValue
      );
      setFilteredBoilerplates(filteredByWordCount);
      console.log(filteredByWordCount);
    } else if (filterParam === "filterTitle") {
      console.log(searchValue, "title filter");
      let filteredByTitle = [];
      filteredByTitle = boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(searchValue) !== -1;
      });
      setFilteredBoilerplates(filteredByTitle);
      console.log(filteredByTitle);
    } else if (filterParam === "filterText") {
      console.log(searchValue, "text filter");
      let filteredByText = [];
      filteredByText = boilerplates.filter((boilerplate) => {
        return boilerplate.text.toLowerCase().indexOf(searchValue) !== -1;
      });
      console.log(filteredByText);
    }
  };

  if (loading) {
    return <h1 className="container">Loading....</h1>;
  }

  let highlightedBoilerplates = filteredBoilerplates.map((boilerplate) => {
    console.log(boilerplate);
    let resultsText = boilerplate.text.replace(
      new RegExp(searchText, "gi"),
      (match) => `<mark>${match}</mark>`
    );
    let resultsTitle = boilerplate.title.replace(
      new RegExp(searchText, "gi"),
      (match) => `<mark>${match}</mark>`
    );
    if (searchText) {
      return (
        <div key={boilerplate.id}>
          <Card>
            <Card.Header>
              Title:
              <a
                href={`/boilerplates/${boilerplate.id}`}
                dangerouslySetInnerHTML={{ __html: resultsTitle }}
              ></a>
            </Card.Header>
            <Card.Body>
              <p dangerouslySetInnerHTML={{ __html: resultsText }}></p>
              <p>Organization: {boilerplate.organization_name}</p>
              <p>Category: {boilerplate.category_name}</p>
              <p>Wordcount: {boilerplate.wordcount}</p>
            </Card.Body>
          </Card>
          <br />
        </div>
      );
    } else {
      return (
        <div key={boilerplate.id}>
          <Card>
            <Card.Header>
              Title:
              <Link to={`/boilerplates/${boilerplate.id}`}>
                {boilerplate.title}
              </Link>
            </Card.Header>
            <Card.Body>
              <p dangerouslySetInnerHTML={{ __html: boilerplate.text }}></p>
              <p>Organization: {boilerplate.organization_name}</p>
              <p>Category: {boilerplate.category_name}</p>
              <p>Wordcount: {boilerplate.wordcount}</p>
            </Card.Body>
          </Card>
          <br />
        </div>
      );
    }
  });

  return (
    <div className="container">
      <h1>Boilerplates</h1>
      <div>
        <br />
        <h3>Add Boilerplate</h3>
        <BoilerplatesNew updateBoilerplates={updateBoilerplates} />
        <br />
        <h3>Select a filter to search boilerplate</h3>

        {/* Search input field */}

        <Form>
          <Form.Group>
            <Form.Label>Search Filter</Form.Label>
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
              <option value="filterWordCount">Word Count</option>
              <option value="filterText">Text</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Search text..."
              value={searchText}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>

        {highlightedBoilerplates}
      </div>
    </div>
  );
}
