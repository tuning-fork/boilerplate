import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "react-query";
import { MdAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
import Modal from "../design/Modal/Modal";
import Container from "../design/Container/Container";
import Hero from "../design/Hero/Hero";
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
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as SectionsService from "../../Services/Organizations/Grants/SectionsService";
// import {
//   createGrantSection,
//   updateGrantSection,
//   // reorderGrantSection,
// } from "../../Services/Organizations/Grants/GrantSectionsService";
import countSectionWords from "../../Helpers/countSectionWords";
import countWords from "../../Helpers/countWords";
import SectionsShow from "../Sections/SectionsShow";
import SectionForm from "../Sections/SectionForm";
import SortableElement from "../Elements/SortableElement";
import StoreSectionAsBoilerplate from "../Sections/StoreSectionAsBoilerplate";
import "./GrantsShow.css";
import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import PasteBoilerplateContentPopout from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopout";

function countTotalSectionsWords(sections = []) {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
}

export default function GrantsShow() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { grantUuid } = useParams();
  const {
    data: grant,
    isError,
    isLoading,
    error,
  } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantUuid)
  );
  const [newSectionUuid, setNewSectionUuid] = useState(null);
  const [editingSectionUuid, setEditingSectionUuid] = useState(null);
  const totalWordCount = countTotalSectionsWords(grant?.sections);

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

  const { mutate: createSection } = useMutation(
    (newSectionFields) =>
      SectionsService.createSection(
        organizationClient,
        grantUuid,
        newSectionFields
      ),
    {
      onSuccess: () => {
        alert("Section created!");
        setNewSectionUuid(null);
      },
    }
  );

  const { mutate: updateSection } = useMutation(
    (newSectionFields) =>
      SectionsService.updateSection(
        organizationClient,
        grantUuid,
        newSectionFields.uuid,
        newSectionFields
      ),
    {
      onSuccess: () => {
        alert("Section edited!");
        setEditingSectionUuid(null);
      },
    }
  );

  function handleCreateSection({ newSectionFields, precedingSection }) {
    createSection({
      title: newSectionFields.title,
      text: newSectionFields.html,
      grantUuid: grantUuid,
      sort_order: precedingSection ? precedingSection.sortOrder + 1 : 0,
      wordcount: countWords(newSectionFields.text),
    });
  }

  const handleEditSection = (newSectionFields) => {
    updateSection({
      ...newSectionFields,
      title: newSectionFields.title,
      text: newSectionFields.html,
      wordcount: countWords(newSectionFields.text),
    });
  };

  // const handleDeleteSection = (sectionFields) => {
  //   // eslint-disable-next-line no-restricted-globals
  //   if (confirm(`Are you sure you want to delete this section?`)) {
  //     updateGrantSection(organizationClient, grantUuid, sectionFields.uuid, {
  //       archived: true,
  //     })
  //       .then(() => {
  //         alert("Section deleted!");
  //         setEditingSectionUuid(null);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         alert(
  //           "Eek! Something went wrong when deleting the section. Try again soon."
  //         );
  //       });
  //   }
  // };
  // const handleReorderSection = (event) => {
  //   const { active, over } = event;
  //   if (active.id !== over.id) {
  //     setGrant((grant) => {
  //       const oldIndex = grant.sections.findIndex(
  //         (section) => section.uuid === active.uuid
  //       );
  //       const newIndex = grant.sections.findIndex(
  //         (section) => section.uuid === over.uuid
  //       );
  //       const reorderedSections = arrayMove(grant.sections, oldIndex, newIndex);

  //       return { ...grant, sections: reorderedSections };
  //     });

  //     const sectionUuid = active.id;
  //     const sortOrder = active.data.current.sortable.index;

  //     reorderGrantSection(organizationClient, grant.uuid, sectionUuid, sortOrder)
  //       .then((response) => {
  //         console.log(
  //           `Succesfully sorted section ${sectionUuid} to index ${sortOrder}!`,
  //           response
  //         );
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const noSectionsContent = newSectionUuid ? (
    <SectionForm
      onStoreSectionAsBoilerplate={setSectionToStoreAsBoilerplate}
      onSubmit={(newSectionFields) => handleCreateSection({ newSectionFields })}
      onCancel={() => setNewSectionUuid(null)}
    />
  ) : (
    <>
      <p className="grants-show__welcome-alert">
        Welcome to your grant! Get started by clicking the Add Section Button
        below.
      </p>
      <Button onClick={() => setNewSectionUuid(1)} variant="text">
        <MdAddCircle />
        Add Section
      </Button>
    </>
  );

  return (
    <div className="grants-show">
      {isOpen && (
        <div className="grants-show__paste-boilerplate-popout">
          <PasteBoilerplateContentPopout />
        </div>
      )}
      <div className="grants-show__content">
        <Hero
          headerText={grant.title}
          fundingOrgText={grant.fundingOrgName}
          rfpWebsiteText={grant.rfpUrl}
          purposeText={grant.purpose}
          deadline={grant.deadline}
          totalWordCount={totalWordCount}
          breadCrumbLink={`/organizations/${currentOrganization.uuid}/grants/`}
          copyLink={`/grants/${grant.uuid}/copy/`}
          editLink={`/grants/${grant.uuid}/edit/`}
        />
        <Container
          className="grants-show__sections-container"
          as="section"
          centered
        >
          {/* <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleReorderSection}
          >
            <SortableContext
              items={grant.sections}
              strategy={verticalListSortingStrategy}
            > */}
          {grant.sections.length ? (
            <ol className="grants-show__section-list">
              {grant.sections.map((section) => (
                <SortableElement key={section.uuid} id={section.uuid}>
                  {editingSectionUuid === section.uuid ? (
                    <SectionForm
                      onStoreSectionAsBoilerplate={
                        setSectionToStoreAsBoilerplate
                      }
                      onSubmit={handleEditSection}
                      onCancel={() => setEditingSectionUuid(null)}
                      section={section}
                    />
                  ) : (
                    <SectionsShow
                      section={section}
                      onClickEdit={setEditingSectionUuid}
                    />
                  )}
                  {newSectionUuid === section.uuid && (
                    <SectionForm
                      onStoreSectionAsBoilerplate={
                        setSectionToStoreAsBoilerplate
                      }
                      onSubmit={(newSectionFields) =>
                        handleCreateSection({
                          newSectionFields,
                          precedingSection: section,
                        })
                      }
                      onCancel={() => setNewSectionUuid(null)}
                    />
                  )}
                  <Button
                    onClick={() => setNewSectionUuid(section.uuid)}
                    variant="text"
                  >
                    <MdAddCircle />
                    Add Section
                  </Button>
                </SortableElement>
              ))}
            </ol>
          ) : (
            noSectionsContent
          )}
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
