import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BiosNew(props) {
  const [quillText, setQuillText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [errors, setErrors] = useState([]);

  const clearForm = () => {
    setQuillText("");
    setFirstName("");
    setLastName("");
    setTitle("");
    setText("");
    setOrganizationId("");
    setWordcount("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/bios",
        {
          first_name: firstName,
          last_name: lastName,
          title: title,
          text: quillText,
          organization_id: organizationId,
          wordcount: countWords(quillText),
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          props.updateBios(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("bio creation error", error);
      });
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </Form.Group>
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
          <Form.Label>Bio Text</Form.Label>
          <ReactQuill
            name="quillText"
            value={quillText}
            onChange={(value) => setQuillText(value)}
          />
          <Form.Group>
            <Form.Label>Word Count</Form.Label>
            <p>{countWords(quillText)}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Organization</Form.Label>
            <Form.Control
              as="select"
              name="organizationId"
              value={organizationId}
              onChange={(event) => setOrganizationId(event.target.value)}
              required
            >
              <option value="" disabled>
                Select Organization
              </option>
              {props.organizations.map((organization) => {
                return (
                  <option
                    key={organization.id}
                    value={organization.id}
                    onChange={(event) => setOrganizationId(event.target.value)}
                  >
                    {organization.name}
                  </option>
                );
              })}
            </Form.Control>
            {props.isHiddenOrganizationsNew ? (
              <Button
                variant="primary"
                size="sm"
                onClick={props.toggleHiddenOrganizationsNew}
              >
                Add Organization
              </Button>
            ) : (
              <Button
                variant="warning"
                size="sm"
                onClick={props.toggleHiddenOrganizationsNew}
              >
                Close Add Organization
              </Button>
            )}
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Save New Bio</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
