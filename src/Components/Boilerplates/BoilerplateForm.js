import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import Button from "../design/Button/Button";
import Label from "../design/Label/Label";
import Dropdown from "../design/Dropdown/Dropdown";
import "./BoilerplateForm.css";
import countWords from "../../Helpers/countWords";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";

export default function BoilerplateForm(props) {
  const { organizationClient } = useCurrentOrganization();
  const { boilerplate, setIsOpen } = props;
  const [boilerplateFields, setBoilerplateFields] = useState({
    ...boilerplate,
    title: boilerplate?.title || "",
    text: boilerplate?.text || "",
    html: boilerplate?.text || "",
    category_id: boilerplate?.category_id || null,
  });
  const quillEl = useRef(null);
  const [categories, setCategories] = useState([]);

  const wordCount = useMemo(() => {
    return countWords(boilerplateFields.text);
  }, [boilerplateFields.text]);

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onSubmit({
      ...boilerplateFields,
    });
  };

  useEffect(() => {
    getAllCategories(organizationClient)
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => console.error(error));
  }, [organizationClient]);

  return (
    <form className="BoilerplateForm" onSubmit={handleSubmit}>
      <TextBox
        value={boilerplateFields.title}
        onChange={(event) => {
          const { value } = event.target;
          setBoilerplateFields((previousBoilerplateFields) => ({
            ...previousBoilerplateFields,
            title: value,
          }));
        }}
        required
        labelText="Boilerplate Title"
      />

      <Dropdown
        options={categories.map((category) => ({
          value: category.name,
          label: category.name,
        }))}
        labelText="Category"
        onChange={(event) => {
          const { value } = event.target;
          setBoilerplateFields((previousBoilerplateFields) => ({
            ...previousBoilerplateFields,
            category,
          }));
        }}
        value={boilerplateFields.category.name}
        className="paste-boilerplate-content-popout__category-search"
      />

      <div className="BoilerplateForm__ContentEditor">
        <div className="BoilerplateForm__ContentEditorHeader">
          <Label htmlFor="text-editor">Boilerplate Text</Label>
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
  );
}
