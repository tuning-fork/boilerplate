import React, { useRef, useState, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import { Button, Select } from "@mantine/core";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import Label from "../design/Label/Label";
import countWords from "../../Helpers/countWords";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./BoilerplateForm.css";

export default function BoilerplateForm(props) {
  const { onDelete } = props;
  const { organizationClient } = useCurrentOrganization();
  const [boilerplateFields, setBoilerplateFields] = useState({
    ...props.boilerplate,
    title: props.boilerplate?.title || "",
    text: props.boilerplate?.text || "",
    html: props.boilerplate?.text || "",
    categoryName: props.boilerplate?.categoryName || null,
    boilerplateFields: null,
  });

  const quillEl = useRef(null);
  const { data: categories, refetch: refetchCategories } = useQuery(
    "getCategories",
    () => CategoriesService.getAllCategories(organizationClient)
  );
  const { mutate: createCategory } = useMutation(
    (categoryFields) =>
      CategoriesService.createCategory(organizationClient, categoryFields),
    {
      onSuccess: () => {
        refetchCategories();
      },
    }
  );

  const wordCount = useMemo(() => {
    return countWords(boilerplateFields.text);
  }, [boilerplateFields.text]);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      ...boilerplateFields,
      categoryId: categories.find(
        (category) => category.name === boilerplateFields.categoryName
      ).id,
    });
  };

  return (
    <form className="BoilerplateForm" onSubmit={handleSubmit}>
      <Select
        label="Category"
        placeholder="Select a Category"
        data-testid="boilerplate-dropdown"
        value={boilerplateFields.categoryName}
        data={categories.map((category) => category.name)}
        onChange={(categoryName) => {
          console.log({ categoryName });
          setBoilerplateFields({
            ...boilerplateFields,
            categoryName,
          });
        }}
        searchable
        nothingFound="No category found"
        clearable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => {
          createCategory({ name: query });
          setBoilerplateFields({
            ...boilerplateFields,
            categoryName: query,
          });
          return query;
        }}
      />
      <TextBox
        labelText="Title"
        value={boilerplateFields.title}
        onChange={(event) =>
          setBoilerplateFields({
            ...boilerplateFields,
            title: event.target.value,
          })
        }
        required
      />
      <div className="BoilerplateForm__ContentEditor">
        <div className="BoilerplateForm__ContentEditorHeader">
          <Label htmlFor="text-editor">Text</Label>
          <b>WORD COUNT: {wordCount}</b>
        </div>
        <RichTextEditor
          id="text-editor"
          className="BoilerplateForm__ContentEditorInput"
          ref={quillEl}
          value={boilerplateFields.html}
          onChange={(html) => {
            setBoilerplateFields((previousBoilerplateFields) => ({
              ...previousBoilerplateFields,
              text: quillEl.current.getEditor().getText(),
              html,
            }));
          }}
        />
      </div>
      <div className="BoilerplateForm__Actions">
        {onDelete && (
          <Button color="red" onClick={() => onDelete(props.boilerplate)}>
            Delete
          </Button>
        )}
        <div className="BoilerplateForm__FormControls">
          <Button variant="subtle" onClick={() => props.onCancel(false)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
