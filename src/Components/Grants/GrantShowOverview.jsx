/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
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
import SectionShowOverview from "../Sections/SectionShowOverview";
// import {
//   updateGrantSection,
//   // reorderGrantSection,
// } from "../../Services/Organizations/Grants/GrantSectionsService";
import countSectionWords from "../../Helpers/countSectionWords";
import countWords from "../../Helpers/countWords";
import SortableElement from "../Elements/SortableElement";
import "./GrantShowOverview.css";

function countTotalSectionsWords(sections = []) {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
}

export default function GrantShowOverview() {
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
  const [editingSectionId, setEditingSectionId] = useState(null);
  const totalWordCount = countTotalSectionsWords(grant?.sections);

  // const sensors = useSensors(
  //   useSensor(PointerSensor)
  //   // This breaks forms nested under drag and drop! The space key triggers
  //   // this sensor. TODO: Circle back to this!
  //   // useSensor(KeyboardSensor, {
  //   //   coordinateGetter: sortableKeyboardCoordinates,
  //   // })
  // );

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

  const handleEditSection = (newSectionFields) => {
    updateSection({
      ...newSectionFields,
      title: newSectionFields.title,
      text: newSectionFields.html,
      wordcount: countWords(newSectionFields.text),
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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="grants-show-overview">
      <div className="grants-show-overview__content">
        <Hero
          headerText={grant.title}
          fundingOrgText={grant.fundingOrgName}
          rfpWebsiteText={grant.rfpUrl}
          purposeText={grant.purpose}
          deadline={grant.deadline}
          totalWordCount={totalWordCount}
          breadCrumbLink={`/organizations/${currentOrganization.id}/grants/`}
        />
        <Container
          className="grants-show-overview__sections-container"
          as="section"
          centered
        >
          <ol className="grants-show__section-list">
            {grant.sections.length > 0 &&
              grant.sections.map((section) => (
                <SortableElement key={section.id} id={section.id}>
                  <SectionShowOverview section={section} />
                </SortableElement>
              ))}
          </ol>
        </Container>
      </div>
    </div>
  );
}
