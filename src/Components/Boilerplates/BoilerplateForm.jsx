import React, { useRef, useState, useMemo } from "react";
import { useQuery } from "react-query";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import Button from "../design/Button/Button";
import Label from "../design/Label/Label";
import Dropdown from "../design/Dropdown/Dropdown";
import "./BoilerplateForm.css";
import countWords from "../../Helpers/countWords";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import CategoryNew from "../Categories/CategoryNew";

export default function BoilerplateForm(props) {
  const { onDelete } = props;
  const { organizationClient } = useCurrentOrganization();
  const [boilerplateFields, setBoilerplateFields] = useState({
    ...props.boilerplate,
    title: props.boilerplate?.title || "",
    text: props.boilerplate?.text || "",
    html: props.boilerplate?.text || "",
    categoryId: props.boilerplate?.categoryId || "",
  });
  const quillEl = useRef(null);
  const { data: categories } = useQuery("getCategories", () =>
    CategoriesService.getAllCategories(organizationClient)
  );
  const [showingCategoriesNew, setShowingCategoriesNew] = useState(false);

  const wordCount = useMemo(() => {
    return countWords(boilerplateFields.text);
  }, [boilerplateFields.text]);

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      ...boilerplateFields,
    });
  };

  const handleCloseCategoryNew = (createdCategory) => {
    setShowingCategoriesNew(false);

    if (createdCategory) {
      setBoilerplateFields({
        ...boilerplateFields,
        categoryId: createdCategory.id,
      });
    }
  };

  return (
    <>
      <form className="BoilerplateForm" onSubmit={handleSubmit}>
        <Dropdown
          altLabel="Add Category"
          onClickAltLabel={() => setShowingCategoriesNew(true)}
          labelText="Category"
          placeholder="Select a Category"
          value={boilerplateFields.categoryId}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          onChange={(option) =>
            setBoilerplateFields({
              ...boilerplateFields,
              categoryId: option.value,
            })
          }
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
            <Button color="error" onClick={() => onDelete(props.boilerplate)}>
              Delete
            </Button>
          )}
          <div className="BoilerplateForm__FormControls">
            <Button variant="text" onClick={() => props.onCancel(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
      <CategoryNew
        show={showingCategoriesNew}
        onClose={handleCloseCategoryNew}
      />
    </>
  );
}
