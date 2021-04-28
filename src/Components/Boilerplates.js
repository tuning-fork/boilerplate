import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoilerplatesNew from "./BoilerplatesNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "./Elements/Modal";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function Boilerplates(props) {
  const [loading, setLoading] = useState(true);
  const [boilerplates, setBoilerplates] = useState([]);
  const [filteredBoilerplates, setFilteredBoilerplates] = useState([]);
  const [isHiddenNew, setIsHiddenNew] = useState(true);
  const [isHiddenCategoriesNew, setIsHiddenCategoriesNew] = useState(true);
  const [query, setQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterParam, setFilterParam] = useState("");
  const [sortParam, setSortParam] = useState("");
  const [filteredByWordCount, setFilteredByWordCount] = useState([]);
  const [openIndex, setOpenIndex] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganizationInfo &&
    currentOrganizationStore.currentOrganizationInfo.id;

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(`/api/organizations/${currentOrganizationId}/boilerplates`, {
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
    }
  }, [currentOrganizationId]);

  const updateBoilerplates = (newBoilerplate) => {
    const newBoilerplates = [...boilerplates];
    newBoilerplates.push(newBoilerplate);
    setBoilerplates(newBoilerplates);
  };

  const handleSearchParamSelect = (event) => {
    setFilterParam(event.target.value);
  };

  const handleSortParamSelect = (event) => {
    setSortParam(event.target.value);
  };

  const sortBoilerplates = (sortParam) => {
    const filteredBoilerplatesClone = [...filteredBoilerplates];
    filteredBoilerplatesClone.sort(function (a, b) {
      return a[sortParam].localeCompare(b[sortParam]);
    });
    setFilteredBoilerplates(filteredBoilerplatesClone);
  };

  useEffect(() => {
    sortBoilerplates(sortParam);
  }, [sortParam]);

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
            <h5>
              <a
                href={`/organizations/${currentOrganizationId}/boilerplates/${boilerplate.id}`}
                dangerouslySetInnerHTML={{ __html: resultsTitle }}
              ></a>
            </h5>
            <Card.Body>
              <h5 dangerouslySetInnerHTML={{ __html: resultsText }}></h5>
              <h5>Organization: {boilerplate.organization_name}</h5>
              <h5>Category: {boilerplate.category_name}</h5>
              <h5>Wordcount: {boilerplate.wordcount}</h5>
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
              <h5>
                <Link
                  to={`/organizations/${currentOrganizationId}/boilerplates/${boilerplate.id}`}
                >
                  {boilerplate.title}
                </Link>
              </h5>
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
      <h1>Stored Content</h1>
      <Button onClick={handleShow}>Add Content</Button>
      <div>
        <Modal onClose={handleClose} show={show}>
          <BoilerplatesNew updateBoilerplates={updateBoilerplates} />
        </Modal>
        {/* Search input field */}

        <Form>
          <Form.Group>
            <Form.Control
              as="select"
              name="filterParam"
              value={filterParam}
              onChange={handleSearchParamSelect}
              required
            >
              {/* <option value="" disabled>
                Search By
              </option> */}
              <option value="filterText">Search By Text</option>
              <option value="filterWordCount">Search By Word Count</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Search parameters..."
              value={searchText}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Sort Parameter</Form.Label>
              <Form.Control
                as="select"
                name="sortParam"
                value={sortParam}
                onChange={handleSortParamSelect}
                required
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="title">Title</option>
                <option value="category_name">Category</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>

        {highlightedBoilerplates}
      </div>
    </div>
  );
}
