import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BiosShow() {
  // constructor(props) {
  //   super(props);

  const [id, setId] = useState("");
  const [quillText, setQuillText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/bios/${props.match.params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setId(response.data.id);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setTitle(response.data.title);
        setQuillText(response.data.text);
        setOrganizationId(response.data.organization_id);
        setOrganization(response.data.organization);
        setWordCount(response.data.wordcount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  const quillChange = (value) => {
    setQuillText(value);
  };

  const handleSubmit = (event) => {
    // const {
    //   first_name,
    //   last_name,
    //   title,
    //   quill_text,
    //   organization_id,
    // } = this.state;
    axios
      .patch(
        "/api/bios/" + id,
        {
          first_name: firstName,
          last_name: lastName,
          title: title,
          text: quillText,
          organization_id: organizationId,
          wordcount: this.countWords(quillText),
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log("bio update error", error);
      });
    event.preventDefault();
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  const handleBioDelete = () => {
    axios
      .delete("/api/bios/" + id, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data.message) {
          props.history.push("/bios");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <Card>
        <Card.Header style={{ backgroundColor: "#09191b" }}>
          <h3
            style={{
              color: "#23cb87",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {firstName} {lastName}
          </h3>
          <h3
            style={{
              color: "#fefefe",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {" "}
            |{" "}
          </h3>
          <h3
            style={{
              color: "#fefefe",
              fontWeight: "bolder",
              display: "inline",
            }}
          >
            {title}
          </h3>
        </Card.Header>
        <Card.Body>
          <h4 dangerouslySetInnerHTML={{ __html: quillText }}></h4>
          <h4>Organization: {organization.name}</h4>
          <h4>Word Count: {countWords(quillText)}</h4>
        </Card.Body>
        {isHidden ? (
          <Button
            onClick={toggleHidden}
            style={{
              maxWidth: "20%",
              align: "right",
              backgroundColor: "#23cb87",
              borderColor: "#fefefe",
              color: "#09191b",
              fontWeight: "bolder",
            }}
          >
            Update Bio
          </Button>
        ) : (
          <Button
            onClick={toggleHidden}
            style={{
              maxWidth: "20%",
              align: "right",
              backgroundColor: "#23cb87",
              borderColor: "#fefefe",
              color: "#09191b",
              fontWeight: "bolder",
            }}
          >
            Close
          </Button>
        )}
      </Card>
      <div>
        {!isHidden ? (
          <Card style={{ backgroundColor: "#09191b", color: "#fefefe" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    name="first_name"
                    placeholder={firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    name="last_name"
                    placeholder={lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    name="title"
                    placeholder={title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <ReactQuill
                  style={{ backgroundColor: "#fefefe" }}
                  value={quillText}
                  onChange={quillChange}
                />
                <Form.Group>
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="text"
                    value={organization.name}
                    name="organization_id"
                    placeholder={organization.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p style={{ color: "#fefefe" }}>{countWords(quillText)}</p>
                </Form.Group>
                <div>
                  <Button
                    variant="outline-success"
                    type="submit"
                    style={{
                      maxWidth: "20%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{
                      maxWidth: "20%",
                      align: "center",
                      backgroundColor: "red",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={handleBioDelete}
                  >
                    Delete Bio
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
