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
import GrantShowOverview from "./GrantShowOverview";

function countTotalSectionsWords(sections = []) {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
}

export default function GrantsShow() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { grantId } = useParams();
  const {
    data: grant,
    isError,
    isLoading,
    error,
  } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );
  const [newSectionId, setNewSectionId] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const totalWordCount = countTotalSectionsWords(grant?.sections);
  const [overView, setOverView] = useState(false);

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
        grantId,
        newSectionFields
      ),
    {
      onSuccess: () => {
        alert("Section created!");
        setNewSectionId(null);
      },
    }
  );

  const { mutate: updateSection } = useMutation(
    (newSectionFields) =>
      SectionsService.updateSection(
        organizationClient,
        grantId,
        newSectionFields.id,
        newSectionFields
      ),
    {
      onSuccess: () => {
        alert("Section edited!");
        setEditingSectionId(null);
      },
    }
  );

  function handleCreateSection({ newSectionFields, precedingSection }) {
    createSection({
      title: newSectionFields.title,
      text: newSectionFields.html,
      grantId: grantId,
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
  //     updateGrantSection(organizationClient, grantId, sectionFields.id, {
  //       archived: true,
  //     })
  //       .then(() => {
  //         alert("Section deleted!");
  //         setEditingSectionId(null);
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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const noSectionsContent = newSectionId ? (
    <SectionForm
      onStoreSectionAsBoilerplate={setSectionToStoreAsBoilerplate}
      onSubmit={(newSectionFields) => handleCreateSection({ newSectionFields })}
      onCancel={() => setNewSectionId(null)}
    />
  ) : (
    <>
      <p className="grants-show__welcome-alert">
        Welcome to your grant! Get started by clicking the Add Section Button
        below.
      </p>
      <Button onClick={() => setNewSectionId(1)} variant="text">
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
          breadCrumbLink={`/organizations/${currentOrganization.id}/grants/`}
          copyLink={`/grants/${grant.id}/copy/`}
          editLink={`/grants/${grant.id}/edit/`}
          setOverView={setOverView}
          overView={overView}
        />
        {overView ? (
          <GrantShowOverview grant={grant} />
        ) : (
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
                  <SortableElement key={section.id} id={section.id}>
                    {editingSectionId === section.id ? (
                      <SectionForm
                        onStoreSectionAsBoilerplate={
                          setSectionToStoreAsBoilerplate
                        }
                        onSubmit={handleEditSection}
                        onCancel={() => setEditingSectionId(null)}
                        section={section}
                      />
                    ) : (
                      <SectionsShow
                        section={section}
                        onClickEdit={setEditingSectionId}
                      />
                    )}
                    {newSectionId === section.id && (
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
                        onCancel={() => setNewSectionId(null)}
                      />
                    )}
                    <Button
                      onClick={() => setNewSectionId(section.id)}
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
        )}
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
