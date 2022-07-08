import React, { useEffect, useState, useRef } from "react";
import Label from "../design/Label/Label";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import Button from "../design/Button/Button";
import Dropdown from "../design/Dropdown/Dropdown";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createBoilerplate } from "../../Services/Organizations/BoilerplatesService";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";
import "./StoreSectionAsBoilerplate.css";
import countWords from "../../Helpers/countWords";

export default function StoreSectionAsBoilerplate(props) {
  const [categories, setCategories] = useState([]);
  const [newBoilerplateFields, setNewBoilerplateFields] = useState({
    title: props.section.title,
    text: props.section.text,
    categoryUuid: "",
    wordcount: "",
  });
  const { organizationClient } = useCurrentOrganization();
  const quillEl = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    createBoilerplate(organizationClient, {
      ...newBoilerplateFields,
      wordcount: countWords(quillEl.current.getEditor().getText()),
    })
      .then((boilerplate) => {
        if (boilerplate) {
          alert("Section saved as boilerplate!");
          props.onClose();
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Oh no! Something went wrong when you were trying to save the section as boilerplate."
        );
      });
  };

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    getAllCategories(organizationClient).then(setCategories);
  }, [organizationClient]);

  return (
    <form className="store-section-as-boilerplate" onSubmit={handleSubmit}>
      <TextBox
        labelText="Title"
        value={newBoilerplateFields.title}
        onChange={(event) => {
          setNewBoilerplateFields({
            ...newBoilerplateFields,
            title: event.target.value,
          });
        }}
        required
      />

      <Dropdown
        labelText="Category"
        placeholder="Select Category"
        value={newBoilerplateFields.categoryUuid}
        onChange={(option) => {
          setNewBoilerplateFields({
            ...newBoilerplateFields,
            categoryUuid: option.value,
          });
        }}
        options={categories.map((category) => ({
          value: category.uuid,
          label: category.name,
        }))}
      />

      <Label htmlFor="boilerplate-text">Text</Label>
      <RichTextEditor
        id="boilerplate-text"
        value={newBoilerplateFields.text}
        ref={quillEl}
        onChange={(html) => {
          setNewBoilerplateFields((fields) => ({
            ...fields,
            text: html,
          }));
        }}
      />
      <div className="store-section-as-boilerplate__actions">
        <Button variant="outlined" onClick={props.onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
