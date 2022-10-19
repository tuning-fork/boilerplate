/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
import SectionListItem from "../Sections/SectionListItem";
// import {
//   updateGrantSection,
//   // reorderGrantSection,
// } from "../../Services/Organizations/Grants/GrantSectionsService";
import countSectionWords from "../../Helpers/countSectionWords";
import countWords from "../../Helpers/countWords";
import SortableElement from "../Elements/SortableElement";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import { DragOverlay } from "@dnd-kit/core";
// import { Draggable } from "./Draggable";
// import { Droppable } from "./Droppable";
import {
  // arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const heroButtons = () => (
    <>
      <Button
        variant="outlined"
        as={CurrentOrganizationLink}
        to={`/grants/${grant.id}/`}
      >
        Content View
      </Button>
    </>
  );

  return (
    // <DndContext>
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
          contentLink={`/grants/${grant.id}/`}
          overviewToggle={true}
          grantId={grant.id}
          heroButtons={heroButtons()}
        />
        <Container
          className="grants-show-overview__sections-container"
          as="section"
          centered
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ol className="grants-show__section-list">
              {grant.sections.length > 0 &&
                grant.sections.map((section) => (
                  <SortableElement key={section.id} id={section.id}>
                    <SectionListItem section={section} />
                  </SortableElement>
                ))}
            </ol>
          </SortableContext>
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </Container>
      </div>
    </div>
    // </DndContext>
  );
}
