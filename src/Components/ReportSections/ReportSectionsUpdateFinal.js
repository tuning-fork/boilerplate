import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import Container from "react-bootstrap/Container";
import "react-quill/dist/quill.snow.css";
import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";
import { updateReportSection } from "../Services/Organizations/Grants/Reports/ReportSectionsService";
import {
  deleteGrantSection,
  getGrantSection,
} from "../Services/Organizations/Grants/GrantSectionsService";

export default function ReportSectionsUpdateFinal(props) {
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [_wordcount, setWordcount] = useState("");
  const [_reportUuid, setReportUuid] = useState("");
  const [_sort_order, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const { currentOrganization, organizationClient } = useCurrentOrganization();

  useEffect(() => {
    if (currentOrganization.uuid) {
      getGrantSection(
        organizationClient,
        props.grantUuid,
        props.reportUuid,
        props.reportSectionUuid
      )
        .then((reportSection) => {
          setTitle(reportSection.title);
          setQuillText(reportSection.text);
          setWordcount(reportSection.wordcount);
          setSortOrder(reportSection.sort_order);
          setReportUuid(reportSection.reportUuid);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [
    currentOrganization.uuid,
    organizationClient,
    props.grantUuid,
    props.reportUuid,
    props.reportSectionUuid,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateReportSection(
      organizationClient,
      props.grantUuid,
      props.reportUuid,
      props.reportSectionUuid,
      {
        title: title,
        text: quillText,
        sort_order: props.section_sort_order,
        wordcount: countWords(quillText),
      },
      { headers: { Authorization: `Bearer ${localStorage.token}` } }
    )
      .then((reportSection) => {
        if (reportSection) {
          toggleHidden();
          props.updateReportSections(reportSection);
        }
      })
      .catch((error) => {
        console.error("section update error", error);
      });
  };

  const handleReportSectionDelete = () => {
    const grantUuid = props.match.params.grantUuid;
    const reportUuid = props.match.params.reportUuid;
    const reportSectionUuid = props.match.params.reportSectionUuid;
    deleteGrantSection(
      organizationClient,
      grantUuid,
      reportUuid,
      reportSectionUuid
    ).catch((error) => {
      console.error(error);
    });
  };

  const countWords = (string) => {
    if (string) {
      return string.split(" ").length;
    } else {
      return 0;
    }
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="container">
      <Container className="whatever" onClick={toggleHidden}>
        <h5>{props.report_section_title}</h5>
        <h5
          dangerouslySetInnerHTML={{ __html: props.report_section_text }}
        ></h5>
      </Container>

      <div className="container">
        <br />
        <br />
        {!isHidden ? (
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    name="title"
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </Form.Group>
                <ReactQuill
                  value={quillText}
                  onChange={(value) => setQuillText(value)}
                />
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p>{countWords(quillText)}</p>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit">Submit</Button>
                  <Button onClick={toggleHidden}>Close</Button>
                  <Button onClick={handleReportSectionDelete}>Delete</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
