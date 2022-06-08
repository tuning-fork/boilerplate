import { useState, useRef } from "react";
import Button from "../design/Button/Button";
import Label from "../../../design/Label/Label";
import TextBox from "../design/TextBox/TextBox";
import RichTextEditor from "../design/RichTextEditor/RichTextEditor";
import "./SplashpageContactForm.css";

//your name
//your title (if applicable)
//your email
//your organization name (if applicable)
//your message
//submit button
//cancel button

export default function SplashpageContactForm(props) {
  const [splashpageContactFields, setSplashpageContactFields] = useState({
    name: "",
    title: "",
    email: "",
    organization_name: "",
    message: "",
    html: "",
  });
  const quillEl = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(splashpageContactFields);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="splashpage-contact-form">
        <TextBox
          labelText="Name"
          value={splashpageContactFields.name}
          onChange={(event) =>
            setSplashpageContactFields({
              ...splashpageContactFields,
              name: event.target.value,
            })
          }
          required
        />
        <TextBox
          labelText="Title"
          value={splashpageContactFields.title}
          onChange={(event) =>
            setSplashpageContactFields({
              ...splashpageContactFields,
              title: event.target.value,
            })
          }
        />
        <TextBox
          labelText="Email"
          value={splashpageContactFields.email}
          onChange={(event) =>
            setSplashpageContactFields({
              ...splashpageContactFields,
              email: event.target.value,
            })
          }
          required
        />
        <TextBox
          labelText="Organization"
          value={splashpageContactFields.organization_name}
          onChange={(event) =>
            setSplashpageContactFields({
              ...splashpageContactFields,
              organization_name: event.target.value,
            })
          }
        />
        <div className="splashpage-contact-form__content-editor">
          <div className="splashpage-contact-form__content-editor-header">
            <Label htmlFor="text-editor">Message</Label>
          </div>
          <RichTextEditor
            id="text-editor"
            className="splashpage-contact-form__content-editor-input"
            ref={quillEl}
            value={splashpageContactFields.html}
            onChange={(html) => {
              setSplashpageContactFields(() => ({
                message: quillEl.current.getEditor().getText(),
                html,
              }));
            }}
          />
        </div>
        ;
        <div className="splashpage-contact-form__actions">
          <Button variant="text" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}
