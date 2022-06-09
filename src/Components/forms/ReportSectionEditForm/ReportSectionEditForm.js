import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import countWords from "components/countWords";

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

export default function ReportSectionEditForm(props) {
  const { onSubmit, onCancel } = props;
  const [newTitle, setNewTitle] = useState(props.title);
  const [newQuillText, setNewQuillText] = useState(props.quillText);
  const [newSortOrder, _setNewSortOrder] = useState(props.sortOrder);

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
      <ReactQuill
        name="newQuillText"
        modules={modules}
        format={formats}
        defaultValue={props.quillText}
        onChange={(value) => setNewQuillText(value)}
        style={{ backgroundColor: "#fefefe", color: "black" }}
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
        </Button>
      </div>
    </Form>
  );
}
