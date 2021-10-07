import React, { useState, useEffect, useCallback, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Modal from "./Elements/Modal";
import Container from "./design/Container/Container";
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
import GrantEdit from "./Grants/GrantEdit";
import GrantCopy from "./Grants/GrantCopy";
import SaveSectionAsBoilerplate from "./Sections/SaveSectionAsBoilerplate";
import "./GrantsShow.css";
import { PasteBoilerplateContentPopoutContext } from "./PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import PasteBoilerplateContentPopout from "./PasteBoilerplateContentPopout/PasteBoilerplateContentPopout";

function countTotalSectionsWords(sections = []) {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
}

export default function GrantsShow(props) {
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
  const { isOpen } = useContext(PasteBoilerplateContentPopoutContext);

  const [showGrantEditModal, setShowGrantEditModal] = useState(false);
  const [showGrantCopyModal, setShowGrantCopyModal] = useState(false);
  const [sectionToSaveAsBoilerplate, setSectionToSaveAsBoilerplate] =
    useState(null);
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

  // const { boilerplateToPaste } = useContext(
  //   PasteBoilerplateContentPopoutContext
  // );

  // Notes for GrantFinalizeShow in process
  // since we'll eventually be integrating the PasteBoilerplate component

  // We'll need to add in a getAllBoilerplates call to pull in the Boilerplates,
  // whether it lives here or on the PasteBoilerplate component

  // We'll need to add in an "Add New Sections" function
  // Since GrantFinalizeShow will now allow include the whole Build a Grant Flow

  // const addNewSections = (newSection) => {
  //   const newSections = [...sections];
  //   newSections.push(newSection);
  //   setSections(newSections);
  // };

  // const updateSections = (updatedSection) => {
  //   if (updatedSection.message) {
  //     const sections = sections.filter(
  //       (section) => section.id !== updatedSection.id
  //     );
  //     setSections(sections);
  //   } else {
  //     const sections = sections.map((section) => {
  //       if (section.id === updatedSection.id) {
  //         section = updatedSection;
  //       }
  //       return section;
  //     });
  //     setSections(sections);
  //   }
  // };

  // This is not yet built out in the Figma, but GrantsShow also
  // includes an index of reports and a form for adding new reports

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

  const handleCancelGrantEdit = (event) => {
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
    <div className="GrantsShow">
      {isOpen && (
        <div className="GrantsShow__PasteBoilerplatePopout">
          <PasteBoilerplateContentPopout />
        </div>
      )}
      <Container className="GrantsShow__Content" centered>
        <div className="GrantsShow__TopBar">
          <Link to={`/organizations/${currentOrganizationId}/grants/`}>
            &lt; Back to All Grants
          </Link>
        </div>

        <section className="GrantsShow__Overview">
          <header className="GrantsShow__Header">
            <h1 className="GrantsShow__Title">{grant.title}</h1>
            <div className="GrantsShow__Actions">
              <Button onClick={handleShowGrantCopyModal}>Copy</Button>
              <Button onClick={handleShowGrantEditModal}>Edit</Button>
              <Modal
                onClose={handleCloseGrantEditModal}
                show={showGrantEditModal}
              >
                <Card>
                  <Card.Body>
                    <GrantEdit
                      grant={grant}
                      onSubmit={handleCloseGrantEditModal}
                      onCancel={handleCancelGrantEdit}
                    />
                  </Card.Body>
                </Card>
              </Modal>
              <Modal
                className="modal-popup"
                onClose={handleCloseGrantCopyModal}
                show={showGrantCopyModal}
              >
                <Card>
                  <Card.Body>
                    <GrantCopy grant={grant} />
                  </Card.Body>
                </Card>
              </Modal>
            </div>
          </header>
          <dl className="GrantsShow__Fields">
            <div className="GrantsShow__Deadline">
              <dt>Deadline:&nbsp;</dt>
              <dd>{formatDate(grant.deadline)}</dd>
            </div>
            <dt>Funding Organization</dt>
            <dd>{grant.funding_org_name}</dd>
            <dt>Purpose</dt>
            <dd>{grant.purpose}</dd>
            <dt>RFP URL</dt>
            <dd>{grant.rfp_url}</dd>
            <dt>Total word count:</dt>
            <dd>{totalWordCount}</dd>
          </dl>
        </section>

        <hr />

        <section>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleReorderSection}
          >
            <SortableContext
              items={grant.sections}
              strategy={verticalListSortingStrategy}
            >
              <ol className="GrantsShow__SectionList">
                {grant.sections?.map((section) => (
                  <SortableElement key={section.id} id={section.id}>
                    <SectionsShow
                      section={section}
                      onSaveSectionAsBoilerplate={setSectionToSaveAsBoilerplate}
                    />
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
                      className="GrantsShow__AddSection"
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
        <Modal show={!!sectionToSaveAsBoilerplate}>
          <SaveSectionAsBoilerplate
            section={sectionToSaveAsBoilerplate}
            onClose={() => setSectionToSaveAsBoilerplate(null)}
          />
        </Modal>
      </Container>
    </div>
  );
}
