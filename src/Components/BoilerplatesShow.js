import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "./Elements/Modal";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function BoilerplatesShow(props) {
  const [id, setId] = useState("");
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isUnzipped, setIsUnzipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const [editableQuillText, setEditableQuillText] = useState("");
  const [editableTitle, setEditableTitle] = useState("");

  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/boilerplates/${props.match.params.boilerplate_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setId(response.data.id);
        setTitle(response.data.title);
        setQuillText(response.data.text);
        setWordcount(response.data.wordcount);
        setOrganizationId(response.data.organization_id);
        setOrganizationName(response.data.organization.name);
        setCategoryId(response.data.category_id);
        setCategoryName(response.data.category.name);
        setLoading(false);
        setEditableTitle(response.data.title);
        setEditableQuillText(response.data.text);
        setEditableCategoryId(response.data.category_id);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/categories`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleUnzipped = () => {
    setIsUnzipped(!isUnzipped);
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/boilerplates/` +
          id,
        {
          title: editableTitle,
          text: editableQuillText,
          wordcount: countWords(quillText),
          organization_id: organizationId,
          category_id: editableCategoryId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        toggleHidden();
        handleClose();
        setEditableTitle(response.data.title);
        setEditableQuillText(response.data.text);
        setEditableCategoryId(response.data.category_id);
      })
      .catch((error) => {
        console.log("boilerplate update error", error);
      });
  };

  const handleCancel = (event) => {
    setEditableTitle(title);
    setEditableQuillText(quillText);
    setEditableCategoryId(categoryId);
    handleClose();
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  const handleBoilerplateDelete = () => {
    axios
      .delete(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/boilerplates/` +
          id,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data.message) {
          history.push(
            `/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/boilerplates`
          );
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
      [{ color: [] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "color",
  ];

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <Card>
        <Card.Header style={{ backgroundColor: "#09191b" }}>
          <h3
            style={{
              color: "#23cb87",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {title}
          </h3>
          <FontAwesomeIcon
            icon={faEdit}
            style={{
              color: "#fefefe",
              fontSize: "1.5rem",
              marginLeft: "160px",
            }}
            onClick={handleShow}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            style={{
              color: "#fefefe",
              fontSize: "1.5rem",
              marginLeft: "10px",
            }}
            onClick={handleBoilerplateDelete}
          />
        </Card.Header>
        <Card.Body>
          <p dangerouslySetInnerHTML={{ __html: quillText }}></p>
          <h4>Organization {organizationName}</h4>
          <h4>Category: {categoryName}</h4>
          <h4>Word Count: {countWords(quillText)}</h4>
        </Card.Body>
      </Card>

      <div>
        <Modal show={show} onClose={handleClose}>
          <Card style={{ backgroundColor: "#09191b", color: "#fefefe" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group style={{ display: "l" }}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableTitle}
                    name="editableTitle"
                    placeholder={title}
                    onChange={(event) => setEditableTitle(event.target.value)}
                    required
                  />
                </Form.Group>
                <ReactQuill
                  name="editableQuillText"
                  modules={modules}
                  format={formats}
                  defaultValue={editableQuillText}
                  onChange={(value) => setEditableQuillText(value)}
                  style={{ backgroundColor: "#fefefe" }}
                />
                <Form.Group>
                  <Form.Label>Category</Form.Label>

                  <Form.Control
                    as="select"
                    name="EditableCategoryId"
                    value={EditableCategoryId}
                    onChange={(event) =>
                      setEditableCategoryId(event.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => {
                      return (
                        <option
                          key={category.id}
                          value={category.id}
                          onChange={(event) =>
                            setEditableCategoryId(event.target.value)
                          }
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p style={{ color: "#fefefe" }}>
                    {countWords(EditableQuillText)}
                  </p>
                </Form.Group>
                <div>
                  <Button
                    variant="outline-success"
                    type="submit"
                    style={{
                      maxWidth: "50%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline-success"
                    style={{
                      maxWidth: "50%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal>
        {/* ) : null} */}
      </div>
    </div>
  );
}
