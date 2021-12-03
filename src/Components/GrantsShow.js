import React, { useState, useEffect, useCallback, useContext } from "react";
import { MdAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "./design/Button/Button";
import Modal from "./design/Modal/Modal";
import Container from "./design/Container/Container";
import Hero from "./design/Hero/Hero";
// import {
// DndContext,
// closestCenter,
// KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
// arrayMove,
// SortableContext,
// sortableKeyboardCoordinates,
// verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import * as GrantsService from "../Services/Organizations/GrantsService";
import {
  createGrantSection,
  // reorderGrantSection,
} from "../Services/Organizations/Grants/GrantSectionsService";
import countSectionWords from "../Helpers/countSectionWords";
import countWords from "../Helpers/countWords";
import SectionsShow from "./SectionsShow";
import SectionForm from "./Sections/SectionForm";
import SortableElement from "./Elements/SortableElement";
import StoreSectionAsBoilerplate from "./Sections/StoreSectionAsBoilerplate";
import "./GrantsShow.css";
import { PasteBoilerplateContentPopoutContext } from "./PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import PasteBoilerplateContentPopout from "./PasteBoilerplateContentPopout/PasteBoilerplateContentPopout";

function countTotalSectionsWords(sections = []) {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
}

export default function GrantsShow() {
  const [grant, setGrant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newSectionIndex, setNewSectionIndex] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const totalWordCount = countTotalSectionsWords(grant?.sections);
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;
  const { grant_id: grantId } = useParams();
  // const sensors = useSensors(
  //   useSensor(PointerSensor)
  //   // This breaks forms nested under drag and drop! The space key triggers
  //   // this sensor. TODO: Circle back to this!
  //   // useSensor(KeyboardSensor, {
  //   //   coordinateGetter: sortableKeyboardCoordinates,
  //   // })
  // );
  const { isOpen } = useContext(PasteBoilerplateContentPopoutContext);

  const [sectionToStoreAsBoilerplate, setSectionToStoreAsBoilerplate] =
    useState(null);

  const getGrant = useCallback(() => {
    if (!organizationClient) {
      return;
    }
    GrantsService.getGrant(organizationClient, grantId)
      .then((grant) => setGrant(grant))
      .catch((error) => setErrors([error]))
      .finally(() => setLoading(false));
  }, [organizationClient, grantId]);

  // Notes for GrantFinalizeShow in process

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

  // const handleReorderSection = (event) => {
  //   const { active, over } = event;
  //   if (active.id !== over.id) {
  //     setGrant((grant) => {
  //       const oldIndex = grant.sections.findIndex(
  //         (section) => section.id === active.id
  //       );
  //       const newIndex = grant.sections.findIndex(
  //         (section) => section.id === over.id
  //       );
  //       const reorderedSections = arrayMove(grant.sections, oldIndex, newIndex);

  //       return { ...grant, sections: reorderedSections };
  //     });

  //     const sectionId = active.id;
  //     const sortOrder = active.data.current.sortable.index;

  //     reorderGrantSection(organizationClient, grant.id, sectionId, sortOrder)
  //       .then((response) => {
  //         console.log(
  //           `Succesfully sorted section ${sectionId} to index ${sortOrder}!`,
  //           response
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

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
      <div className="GrantsShow__Content">
        <Hero
          headerText={grant.title}
          fundingOrgText={grant.funding_org_name}
          rfpWebsiteText={grant.rfp_url}
          purposeText={grant.purpose}
          deadlineText={grant.deadline}
          totalWordCount={totalWordCount}
          breadCrumbLink={`/organizations/${currentOrganizationId}/grants/`}
          copyLink={`/organizations/${currentOrganizationId}/grants/${grant.id}/copy/`}
          editLink={`/organizations/${currentOrganizationId}/grants/${grant.id}/edit/`}
        />
        <Container as="section" centered>
          {/* <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleReorderSection}
          >
            <SortableContext
              items={grant.sections}
              strategy={verticalListSortingStrategy}
            > */}
          <ol className="GrantsShow__SectionList">
            {grant.sections?.map((section) => (
              <SortableElement key={section.id} id={section.id}>
                {editingSectionId === section.id ? (
                  <SectionForm
                    onStoreSectionAsBoilerplate={setSectionToStoreAsBoilerplate}
                    onSubmit={(newSectionFields) =>
                      console.log({
                        newSectionFields,
                        section,
                      })
                    }
                    onCancel={() => setEditingSectionId(null)}
                    section={section}
                  />
                ) : (
                  <SectionsShow
                    section={section}
                    onClickEdit={setEditingSectionId}
                  />
                )}
                {newSectionIndex === section.id && (
                  <SectionForm
                    onStoreSectionAsBoilerplate={setSectionToStoreAsBoilerplate}
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
                  variant="text"
                >
                  <MdAddCircle />
                  Add Section
                </Button>
              </SortableElement>
            ))}
          </ol>
          {/* </SortableContext>
          </DndContext> */}
        </Container>
      </div>
      <Modal
        show={!!sectionToStoreAsBoilerplate}
        heading="Store Section as Boilerplate"
      >
        <StoreSectionAsBoilerplate
          section={sectionToStoreAsBoilerplate}
          onClose={() => setSectionToStoreAsBoilerplate(null)}
        />
      </Modal>
    </div>
  );
}
