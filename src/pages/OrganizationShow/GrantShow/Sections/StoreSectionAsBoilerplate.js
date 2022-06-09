import React, { useEffect, useState, useRef } from "react";
import Label from "../../../components/design/Label/Label";
import TextBox from "../../../components/design/TextBox/TextBox";
import RichTextEditor from "../../../components/design/RichTextEditor/RichTextEditor";
import Button from "../../../components/design/Button/Button";
import Dropdown from "../../../components/design/Dropdown/Dropdown";
import { useCurrentOrganization } from "../../../contexts/currentOrganizationContext";
import { createBoilerplate } from "../../../services/p0/Organizations/BoilerplatesService";
import { getAllCategories } from "../../../services/p0/Organizations/CategoriesService";
import "./StoreSectionAsBoilerplate.css";
import countWords from "../../../lib/countWords";

export default function StoreSectionAsBoilerplate(props) {
  const [categories, setCategories] = useState([]);
  const [newBoilerplateFields, setNewBoilerplateFields] = useState({
    title: props.section.title,
    text: props.section.text,
    categoryId: "",
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
        value={newBoilerplateFields.categoryId}
        onChange={(option) => {
          setNewBoilerplateFields({
            ...newBoilerplateFields,
            categoryId: option.value,
          });
        }}
        options={categories.map((category) => ({
          value: category.id?.toString(),
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
