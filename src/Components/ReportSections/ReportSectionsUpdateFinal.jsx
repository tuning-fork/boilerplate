import React, { useState, useEffect } from "react";
import Button from "../design/Button/Button";
import ReactQuill from "react-quill";
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
  const [_reportId, setReportId] = useState("");
  const [_sort_order, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const { currentOrganization, organizationClient } = useCurrentOrganization();

  useEffect(() => {
    if (currentOrganization.id) {
      getGrantSection(
        organizationClient,
        props.grantId,
        props.reportId,
        props.reportSectionId
      )
        .then((reportSection) => {
          setTitle(reportSection.title);
          setQuillText(reportSection.text);
          setWordcount(reportSection.wordcount);
          setSortOrder(reportSection.sort_order);
          setReportId(reportSection.reportId);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [
    currentOrganization.id,
    organizationClient,
    props.grantId,
    props.reportId,
    props.reportSectionId,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateReportSection(
      organizationClient,
      props.grantId,
      props.reportId,
      props.reportSectionId,
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
    const grantId = props.match.params.grantId;
    const reportId = props.match.params.reportId;
    const reportSectionId = props.match.params.reportSectionId;
    deleteGrantSection(
      organizationClient,
      grantId,
      reportId,
      reportSectionId
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
      <div className="whatever" onClick={toggleHidden}>
        <h5>{props.report_section_title}</h5>
        <h5
          dangerouslySetInnerHTML={{ __html: props.report_section_text }}
        ></h5>
      </div>

      <div className="container">
        <br />
        <br />
        {!isHidden ? (
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={(event) => setTitle(event.target.value)}
                    required
                  />
                </div>
                <ReactQuill
                  value={quillText}
                  onChange={(value) => setQuillText(value)}
                />
                <div>
                  <label>Word Count</label>
                  <p>{countWords(quillText)}</p>
                </div>
                <div className="text-center">
                  <Button type="submit">Submit</Button>
                  <Button onClick={toggleHidden}>Close</Button>
                  <Button onClick={handleReportSectionDelete}>Delete</Button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
