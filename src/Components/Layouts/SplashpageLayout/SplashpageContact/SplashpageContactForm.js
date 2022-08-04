import { useState, useRef } from "react";
import axios from "axios";
import Button from "../../../design/Button/Button";
import Container from "../../../design/Container/Container";
import TextBox from "../../../design/TextBox/TextBox";
import "./SplashpageContactForm.css";

export default function SplashpageContactForm(props) {
  const [splashpageContactFields, setSplashpageContactFields] = useState({
    name: "",
    title: "",
    email: "",
    organization_name: "",
    message: "",
  });
  const [displayContactSubmittedMessage, setDisplayContactSubmittedMessage] =
    useState("");

  const sendContactSubmission = (splashpageContactFields) => {
    axios
      .post("/api/contact_us", { ...splashpageContactFields })
      .then((response) => {
        if (response.status === 201) {
          setDisplayContactSubmittedMessage(response.data.message);
          setSplashpageContactFields({});
        }
      })
      .catch((error) => console.error(error.message));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendContactSubmission(splashpageContactFields);
  };

  return (
    <>
      <Container
        as="section"
        centered
        className="splashpage-contact-form__container"
      >
        {displayContactSubmittedMessage ? (
          <>
            <p>Thanks for contacting us! We will be in touch soon.</p>
            <p>Your message:</p>
            <div>{displayContactSubmittedMessage}</div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="splashpage-contact-form">
            <h1 id="modal-heading" className="splashpage-contact-form__header">
              Contact Us
            </h1>
            <TextBox
              type="text"
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
              type="text"
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
              type="text"
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
              type="text"
              labelText="Organization"
              value={splashpageContactFields.organization_name}
              onChange={(event) =>
                setSplashpageContactFields({
                  ...splashpageContactFields,
                  organization_name: event.target.value,
                })
              }
            />
            <TextBox
              type="text"
              inputType="textarea"
              labelText="Message"
              value={splashpageContactFields.message}
              onChange={(event) =>
                setSplashpageContactFields({
                  ...splashpageContactFields,
                  message: event.target.value,
                })
              }
            />
            <div className="splashpage-contact-form__actions">
              <Button variant="text" onClick={() => props.setPanelView("")}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        )}
      </Container>
    </>
  );
}
