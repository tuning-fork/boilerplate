import React, { useState, useEffect, useCallback } from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Modal from "./Elements/Modal";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import * as GrantsService from "../Services/Organizations/GrantsService";
import {
  createGrantSection,
  reorderGrantSection,
} from "../Services/Organizations/Grants/GrantSectionsService";
import formatDate from "../Helpers/formatDate";
import countSectionWords from "../Helpers/countSectionWords";
import countWords from "../Helpers/countWords";
import SectionsShow from "./SectionsShow";
import SectionForm from "./Sections/SectionForm";
import SortableElement from "./Elements/SortableElement";
import GrantEditForm from "./Grants/GrantEditForm";
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
  const sensors = useSensors(
    useSensor(PointerSensor)
    // This breaks forms nested under drag and drop! The space key triggers
    // this sensor. TODO: Circle back to this!
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );

  const [showGrantEditModal, setShowGrantEditModal] = useState(false);
  const [showGrantCopyModal, setShowGrantCopyModal] = useState(false);
  const handleShowGrantEditModal = (event) => setShowGrantEditModal(true);
  const handleCloseGrantEditModal = (event) => setShowGrantEditModal(false);
  const handleShowGrantCopyModal = (event) => setShowGrantCopyModal(true);
  const handleCloseGrantCopyModal = (event) => setShowGrantCopyModal(false);

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
      wordcount: countWords(newSectionFields.text),
    }).then(() => {
      alert("Section created!");
      setNewSectionIndex(null);
      return getGrant();
    });
  };

  const handleSubmitEditGrantForm = ({
    newTitle,
    newRfpUrl,
    newDeadline,
    newSubmitted,
    newSuccessful,
    newPurpose,
  }) => {
    GrantsService.updateGrant(organizationClient, grantId, {
      title: newTitle,
      rfp_url: newRfpUrl,
      deadline: newDeadline,
      submitted: newSubmitted,
      successful: newSuccessful,
      purpose: newPurpose,
      organization_id: grant.organizationId,
      funding_org_id: grant.fundingOrgId,
    })
      .then((updatedGrant) => {
        handleCloseGrantEditModal();
        setGrant(updatedGrant);
      })
      .catch((error) => {
        console.log("grant update error", error);
      });
  };

  const handleCancelEditGrantForm = (event) => {
    handleCloseGrantEditModal();
  };

  const handleReorderSection = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setGrant((grant) => {
        const oldIndex = grant.sections.findIndex(
          (section) => section.id === active.id
        );
        const newIndex = grant.sections.findIndex(
          (section) => section.id === over.id
        );
        const reorderedSections = arrayMove(grant.sections, oldIndex, newIndex);

        return { ...grant, sections: reorderedSections };
      });

      const sectionId = active.id;
      const sortOrder = active.data.current.sortable.index;

      reorderGrantSection(organizationClient, grant.id, sectionId, sortOrder)
        .then((response) => {
          console.log(
            `Succesfully sorted section ${sectionId} to index ${sortOrder}!`,
            response
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
            {/* <Link
              className="btn btn-outline-dark"
              to={`/organizations/${currentOrganizationId}/grants/${grant.id}/edit`}
            >
              Edit
            </Link> */}
            <Button onClick={handleShowGrantEditModal}>Edit</Button>
            <Modal
              className="modal-popup"
              onClose={handleCloseGrantEditModal}
              show={showGrantEditModal}
            >
              <Card>
                <Card.Body>
                  <GrantEditForm
                    grant={grant}
                    onSubmit={handleSubmitEditGrantForm}
                    onCancel={handleCancelEditGrantForm}
                  />
                </Card.Body>
              </Card>
            </Modal>
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

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleReorderSection}
        >
          <SortableContext
            items={grant.sections}
            strategy={verticalListSortingStrategy}
          >
            <ol className="GrantsFinalizeShow__SectionList">
              {grant.sections?.map((section) => (
                <SortableElement key={section.id} id={section.id}>
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
                </SortableElement>
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      </section>
    </Container>
  );
}
