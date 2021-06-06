import React, { useState, useEffect, useCallback } from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import * as GrantsService from "../Services/Organizations/GrantsService";
import { createGrantSection } from "../Services/Organizations/Grants/GrantSectionsService";
import formatDate from "../Helpers/formatDate";
import countSectionWords from "../Helpers/countSectionWords";
import countWords from "../Helpers/countWords";
import SectionsShow from "./SectionsShow";
import SectionForm from "./Sections/SectionForm";
import "./GrantsFinalizeShow.css";

function countTotalSectionsWords(sections = []) {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
}

export default function GrantsFinalizeShow(props) {
  const [grant, setGrant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newSectionIndex, setNewSectionIndex] = useState(null);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const totalWordCount = countTotalSectionsWords(grant?.sections);
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;
  const { grant_id: grantId } = useParams();

  const getGrant = useCallback(() => {
    if (!organizationClient) {
      return;
    }
    GrantsService.getGrant(organizationClient, grantId)
      .then((grant) => setGrant(grant))
      .catch((error) => setErrors([error]))
      .finally(() => setLoading(false));
  }, [organizationClient, grantId]);

  const handleSubmitSectionForm = ({ newSectionFields, precedingSection }) => {
    createGrantSection(organizationClient, grantId, {
      title: newSectionFields.title,
      text: newSectionFields.html,
      grant_id: grantId,
      sort_order: precedingSection.sort_order + 1,
      // TODO: consider moving wordcount to server-side
      wordcount: countWords(newSectionFields.text),
    }).then(() => {
      alert("Section created!");
      setNewSectionIndex(null);
      return getGrant();
    });
  };

  useEffect(() => {
    getGrant();
  }, [getGrant]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container className="GrantsFinalizeShow" fluid>
      <div className="GrantsFinalizeShow__TopBar">
        <Link to={`/organizations/${currentOrganizationId}/grants/`}>
          &lt; Back to All Grants
        </Link>
      </div>

      <section className="GrantsFinalizeShow__Overview">
        <header className="GrantsFinalizeShow__Header">
          <h1 className="GrantsFinalizeShow__Title">{grant.title}</h1>
          <div className="GrantsFinalizeShow__Actions">
            <Link
              className="GrantsFinalizeShow__MakeCopy"
              to={`/organizations/${currentOrganizationId}/grants/${grant.id}/copy`}
            >
              Make a Copy
            </Link>
            <Link
              className="btn btn-outline-dark"
              to={`/organizations/${currentOrganizationId}/grants/${grant.id}/edit`}
            >
              Edit
            </Link>
          </div>
        </header>
        <dl className="GrantsFinalizeShow__Fields">
          <div className="GrantsFinalizeShow__Deadline">
            <dt>Deadline:&nbsp;</dt>
            <dd>{formatDate(grant.deadline)}</dd>
          </div>
          <dt>Funding Organization</dt>
          <dd>{grant.funding_org_name}</dd>
          <dt>Purpose</dt>
          <dd>{grant.purpose}</dd>
          <dt>RFP URL</dt>
          <dd>{grant.rfp_url}</dd>
        </dl>
      </section>

      <hr />

      <section>
        <p className="GrantsFinalizeShow__TotalWordCount">
          Total word count: <span>{totalWordCount}</span>
        </p>

        <ol className="GrantsFinalizeShow__SectionList">
          {grant.sections?.map((section) => (
            <React.Fragment key={section.id}>
              <SectionsShow section={section} />
              {newSectionIndex === section.id && (
                <SectionForm
                  onSubmit={(newSectionFields) =>
                    handleSubmitSectionForm({
                      newSectionFields,
                      precedingSection: section,
                    })
                  }
                  onCancel={() => setNewSectionIndex(null)}
                />
              )}
              <Button
                className="GrantsFinalizeShow__AddSection"
                onClick={() => setNewSectionIndex(section.id)}
              >
                Add Section
              </Button>
            </React.Fragment>
          ))}
        </ol>
      </section>
    </Container>
  );
}
