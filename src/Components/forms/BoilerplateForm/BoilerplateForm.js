import React, { useRef, useState, useMemo } from "react";
import { useQuery } from "react-query";
import TextBox from "../../../components/design/TextBox/TextBox";
import RichTextEditor from "../../../components/design/RichTextEditor/RichTextEditor";
import Button from "../../../components/design/Button/Button";
import Label from "../../../components/design/Label/Label";
import Dropdown from "../../../components/design/Dropdown/Dropdown";
import "./BoilerplateForm.css";
import countWords from "../../../lib/countWords";
import * as CategoriesService from "../../../services/p0/Organizations/CategoriesService";
import { useCurrentOrganization } from "../../../contexts/currentOrganizationContext";
import CategoriesNew from "../Categories/CategoriesNew";

export default function BoilerplateForm(props) {
  const [setCategories] = useState([]);
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
          <div className="BoilerplateForm__FormControls">
            <Button variant="text" onClick={() => props.onCancel(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
      <CategoriesNew
        show={showingCategoriesNew}
        onClose={() => setShowingCategoriesNew(false)}
        currentCategories={categories}
        setCategories={setCategories}
      />
    </>
  );
}
