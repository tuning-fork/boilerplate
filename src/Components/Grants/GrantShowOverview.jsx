import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
import Container from "../design/Container/Container";
import Hero from "../design/Hero/Hero";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as SectionsService from "../../Services/Organizations/Grants/SectionsService";
import countSectionWords from "../../Helpers/countSectionWords";
import { SortableItem } from "./SortableItem";
import { Item } from "./Item";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";

import "./GrantShowOverview.css";

function countTotalSectionsWords(sections = []) {
  return sections?.reduce(
    (total, section) => total + countSectionWords(section),
    0
  );
}

export default function GrantShowOverview(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { grantId } = useParams();
  const [reorderHistory, setReorderHistory] = useState([]);
  const [reorderIndex, setReorderIndex] = useState([reorderHistory.length - 1]);

  // useEffect =
  //   (() => {
  //   },
  //   [reorderHistory]);

  console.log(reorderHistory);

  const {
    data: grant,
    isError,
    isLoading,
    error,
  } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );
  const totalWordCount = countTotalSectionsWords(grant?.sections);

  const grantSectionsReorder = () => {
    const sectionsToReorder = [];
    props.sortableSections.forEach((newSection, index) => {
      const checkSection = grant.sections[index];
      if (newSection.sortOrder !== checkSection.sortOrder) {
        sectionsToReorder.push({
          id: newSection.id,
          sort_order: index,
        });
      }
    });
    if (sectionsToReorder.length > 0) {
      reorderSections(sectionsToReorder);
    }
  };

  useEffect(() => {
    if (props.sortableSections && props.sortableSections.length > 1) {
      setReorderHistory([...reorderHistory, props.sortableSections]);
      setReorderIndex(reorderHistory.length - 1);
    }
  }, [props.sortableSections]);

  useEffect(() => {
    setReorderHistory([]);
    setReorderIndex(reorderHistory.length - 1);
  }, [grantId]);

  const onUndo = () => {
    setReorderIndex(reorderIndex - 1);
    console.log(reorderIndex);
  };

  const { mutate: reorderSections } = useMutation(
    (sectionsToReorder) =>
      SectionsService.reorderSections(
        organizationClient,
        grantId,
        sectionsToReorder
      ),
    {
      onSuccess: () => {
        alert("Sections reordered!");
      },
    }
  );

  useEffect(() => {
    props.setSortableSections(grant.sections);
  }, []);

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
          <div className="grants-show-overview__save-button">
            <Button
              onClick={() => {
                grantSectionsReorder();
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                onUndo();
              }}
            >
              Undo
            </Button>
            <Button
              onClick={() => {
                grantSectionsReorder();
              }}
            >
              Redo
            </Button>
          </div>
          <SortableContext
            items={props.sortableSections}
            strategy={verticalListSortingStrategy}
          >
            {props.sortableSections.map((item) => (
              <SortableItem key={item.id} id={item.id} item={item} />
            ))}
          </SortableContext>
          <DragOverlay>
            {props.activeId ? <Item id={props.activeId} /> : null}
          </DragOverlay>
        </Container>
      </div>
    </div>
  );
}
