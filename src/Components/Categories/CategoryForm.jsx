import React, { useState } from "react";
import { Button } from "@mantine/core";
import TextBox from "../design/TextBox/TextBox";
import "./CategoryForm.css";

export default function CategoryForm(props) {
  const [categoryFields, setCategoryFields] = useState({
    ...props.category,
    name: props.category?.name || "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(categoryFields);
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <TextBox
        labelText="Name"
        value={categoryFields.name}
        onChange={(event) =>
          setCategoryFields({ ...categoryFields, name: event.target.value })
        }
        required
      />
      <div className="category-form__actions">
        <Button variant="subtle" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
