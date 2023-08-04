import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import Label from "../design/Label/Label";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import { Button } from "@mantine/core";
import Dropdown from "../design/Dropdown/Dropdown";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as BoilerplatesService from "../../Services/Organizations/BoilerplatesService";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import "./StoreSectionAsBoilerplate.css";
import countWords from "../../Helpers/countWords";

export default function StoreSectionAsBoilerplate(props) {
  const { organizationClient } = useCurrentOrganization();
  const { data: categories } = useQuery("getCategories", () =>
    CategoriesService.getAllCategories(organizationClient)
  );

  const [newBoilerplateFields, setNewBoilerplateFields] = useState({
    title: props.section.title,
    text: props.section.text,
    categoryId: "",
    wordcount: "",
  });

  const { mutate: saveBoilerplate } = useMutation(
    (newBoilerplateFields) =>
      BoilerplatesService.createBoilerplate(organizationClient, {
        title: newBoilerplateFields.title,
        text: newBoilerplateFields.text,
        categoryId: newBoilerplateFields.categoryId,
        wordcount: countWords(newBoilerplateFields.text),
      }),
    {
      onSuccess: () => {
        alert("Section saved as boilerplate!");
        props.onClose();
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    saveBoilerplate({
      ...newBoilerplateFields,
    });
  };

  const quillEl = useRef();

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
          value: category.id,
          label: category.name,
        }))}
        required
        testid="category-dropdown"
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
        <Button variant="outline" onClick={props.onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
