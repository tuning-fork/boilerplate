import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import countWords from "../../Helpers/countWords";

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

export default function SectionEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newTitle, setNewTitle] = useState(props.title);
  const [newQuillText, setNewQuillText] = useState(props.quillText);
  const [newSortOrder, setNewSortOrder] = useState(props.sortOrder);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      newTitle,
      newQuillText,
      newSortOrder,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={newTitle}
          name="newTitle"
          onChange={(event) => setNewTitle(event.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Add Boilerplate to text field below</Form.Label>
        <Form.Control
          as="select"
          name="currentBoilerplate"
          value={currentBoilerplate}
          onChange={handleSelect}
        >
          <option value="" disabled>
            Select Boilerplate
          </option>
          {props.boilerplates.map((boilerplate) => {
            return (
              <option
                key={boilerplate.id}
                value={boilerplate.text}
                onChange={(event) => setCurrentBoilerplate(event.target.value)}
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
          {props.bios.map((bio) => {
            return (
              <option
                key={bio.id}
                value={`${bio.first_name} ${bio.last_name}: ${bio.text}`}
                onChange={(event) => setCurrentBoilerplate(event.target.value)}
              >
                {`${bio.first_name} ${bio.last_name}`}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <ReactQuill
        value={newQuillText}
        onChange={(value) => setNewQuillText(value)}
      />
      <Form.Group>
        <Form.Label>Word Count</Form.Label>
        <p>{countWords(newQuillText)}</p>
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
          <Button
            variant="outline-danger"
            style={{
              maxWidth: "50%",
              align: "center",
              backgroundColor: "#23cb87",
              color: "#09191b",
              fontWeight: "bolder",
            }}
            onClick={handleSectionDelete}
          ></Button>
          Delete Section
        </Button>
      </div>
    </Form>
  );
}
