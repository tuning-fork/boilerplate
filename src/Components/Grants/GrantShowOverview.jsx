import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
import Checkbox from "../design/Checkbox/Checkbox";
import Container from "../design/Container/Container";
import Hero from "../design/Hero/Hero";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as SectionsService from "../../Services/Organizations/Grants/SectionsService";
import { SortableItem } from "./SortableItem";
import { Item } from "./Item";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import {
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import "./GrantShowOverview.css";

export default function GrantShowOverview() {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const sensors = useSensors(useSensor(MouseSensor));
  const [sortableSections, setSortableSections] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const { grantId } = useParams();
  const [checked, setChecked] = useState(false);
  const [reorderHistory, setReorderHistory] = useState([]);
  const [reorderIndex, setReorderIndex] = useState(0);
  const [canSaveReorder, setCanSaveReorder] = useState(false);
  const ref = useRef(reorderIndex);

  const {
    data: grant,
    isError,
    isLoading,
    error,
  } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );

  const grantSectionsReorder = () => {
    const sectionsToReorder = [];
    sortableSections.forEach((newSection, index) => {
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
    setSortableSections(grant.sections);
    setReorderHistory([grant.sections]);
    setReorderIndex(0);
  }, [
    grantId,
    grant.sections,
    setSortableSections,
    setReorderHistory,
    setReorderIndex,
  ]);

  const updateState = (newState) => {
    ref.current = newState;
    setReorderIndex(newState);
  };

  function handleDragStart(event) {
    const { active } = event;
    console.log(event);
    setActiveId(active.id);
    console.log(activeId);
  }

  function handleDragEnd({ active, over }) {
    if (active.id !== over.id) {
      const newSectionOrder = (items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        setReorderHistory([
          ...reorderHistory,
          arrayMove(items, oldIndex, newIndex),
        ]);
        return arrayMove(items, oldIndex, newIndex);
      };
      setSortableSections(newSectionOrder);
      updateState(reorderIndex + 1);
      setCanSaveReorder(true);
    }
  }

  const onUndo = () => {
    if (reorderIndex > 0 && reorderIndex !== 1) {
      setSortableSections(reorderHistory[reorderIndex - 1]);
      updateState(reorderIndex - 1);
      setCanSaveReorder(true);
    } else if (reorderIndex === 1) {
      setSortableSections(reorderHistory[reorderIndex - 1]);
      updateState(reorderIndex - 1);
      setCanSaveReorder(false);
    }
  };

  const onRedo = () => {
    if (reorderIndex + 1 < reorderHistory.length && reorderHistory.length > 1) {
      setSortableSections(reorderHistory[reorderIndex + 1]);
      updateState(reorderIndex + 1);
      setCanSaveReorder(true);
    }
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
        setCanSaveReorder(false);
      },
    }
  );

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
          totalWordCount={0}
          breadCrumbLink={`/organizations/${currentOrganization.id}/grants/`}
          contentLink={`/grants/${grant.id}/`}
          overviewToggle={true}
          grantId={grant.id}
          heroButtons={heroButtons()}
        />
        <div className="grants-show-overview__content-panels">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[
              restrictToFirstScrollableAncestor,
              restrictToVerticalAxis,
            ]}
          >
            <Container
              className="grants-show-overview__draggable-sections-container"
              as="section"
            >
              <div className="grants-show-overview__save-button">
                <Button
                  onClick={() => {
                    grantSectionsReorder();
                  }}
                  disabled={!canSaveReorder}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    onUndo();
                  }}
                  disabled={reorderIndex === 0}
                >
                  Undo
                </Button>
                <Button
                  onClick={() => {
                    onRedo();
                  }}
                  disabled={
                    reorderIndex + 1 === reorderHistory.length ||
                    reorderHistory.length <= 1
                  }
                >
                  Redo
                </Button>
              </div>
              <SortableContext
                items={sortableSections}
                strategy={verticalListSortingStrategy}
              >
                {sortableSections.map((item) => (
                  <SortableItem key={item.id} id={item.id} item={item} />
                ))}
              </SortableContext>
              <DragOverlay>
                {activeId ? <Item id={activeId} /> : null}
              </DragOverlay>
            </Container>
          </DndContext>
          <Container className="grants-show-overview__preview-container">
            <div className="grants-show-overview__preview-checkbox">
              <Checkbox
                labelText="Show Section Title"
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              >
                Show Section Title
              </Checkbox>
            </div>
            <div className="grants-show-overview__preview-text">
              {sortableSections.map((section) => {
                return (
                  <React.Fragment key={section.id}>
                    {!!checked && (
                      <div
                        className="grants-show-overview__preview-title"
                        dangerouslySetInnerHTML={{ __html: section.title }}
                      ></div>
                    )}
                    <div
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    ></div>
                  </React.Fragment>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
