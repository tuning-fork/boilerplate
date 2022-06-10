import { useState, useRef } from "react";
import axios from "axios";
import Button from "../../../design/Button/Button";
import Label from "../../../design/Label/Label";
import Container from "../../../design/Container/Container";
import TextBox from "../../../design/TextBox/TextBox";
import RichTextEditor from "../../../design/RichTextEditor/RichTextEditor";
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
  const [displayContactSubmittedMessage, setDisplayContactSubmittedMessage] =
    useState("");

  const sendContactSubmission = (splashpageContactFields) => {
    console.log(splashpageContactFields);
    axios
      .post("/api/contact_us", { ...splashpageContactFields })
      .then((response) => {
        setDisplayContactSubmittedMessage(response.data.message);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(splashpageContactFields);
    sendContactSubmission(splashpageContactFields);
  };

  console.log(splashpageContactFields);
  return (
    <>
      <Container
        as="section"
        centered
        className="splashpage-contact-form__container"
      >
        <form onSubmit={handleSubmit} className="splashpage-contact-form">
          <h1 id="modal-heading" className="splashpage-contact-form__header">
            Contact Us
          </h1>
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
                  ...splashpageContactFields,
                  message: quillEl.current.getEditor().getText(),
                  html,
                }));
              }}
            />
          </div>
          <div className="splashpage-contact-form__actions">
            <Button
              variant="text"
              onClick={() => props.setShowSplashPagePanel(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Container>
    </>
  );
}
