import { useState } from "react";
import { Button } from "@mantine/core";
import TextBox from "../../../design/TextBox/TextBox";
import "./SplashpageContactForm.css";
import * as ContactService from "../../../../Services/ContactService";
import { useMutation } from "react-query";
import Spinner from "../../../Helpers/Spinner";

export default function SplashpageContactForm() {
  const [splashpageContactFields, setSplashpageContactFields] = useState({
    name: "",
    title: "",
    email: "",
    organization_name: "",
    message: "",
  });
  const [displayContactSubmittedMessage, setDisplayContactSubmittedMessage] =
    useState("");

  const { mutate: sendContactSubmission, isLoading } = useMutation(
    (newContactFields) =>
      ContactService.sendContactSubmission(newContactFields),
    {
      onSuccess: (newContactSubmission) => {
        setDisplayContactSubmittedMessage(newContactSubmission.message);
        setSplashpageContactFields({});
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    sendContactSubmission(splashpageContactFields);
  };

  return (
    <div className="splashpage-contact-form__container">
      {displayContactSubmittedMessage ? (
        <>
          <div className="splashpage-contact-form__confirmation-message">
            <p>Thanks for contacting us! We will be in touch soon.</p>
            <p>This is the text of the message you sent us:</p>
          </div>
          <blockquote className="splashpage-contact-form__submitted-message">
            {displayContactSubmittedMessage}
          </blockquote>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="splashpage-contact-form">
          <TextBox
            type="text"
            labelText="Name"
            placeholderText="Enter your name"
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
            placeholderText="Enter your job title"
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
            placeholderText="Enter your email address"
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
            placeholderText="Enter your organization or business"
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
            placeholderText="Questions? Comments? Let us know what you think!"
            value={splashpageContactFields.message}
            onChange={(event) =>
              setSplashpageContactFields({
                ...splashpageContactFields,
                message: event.target.value,
              })
            }
          />
          <div className="splashpage-contact-form__actions">
            <Button type="submit">
              Save {isLoading && <Spinner size="xs" />}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
