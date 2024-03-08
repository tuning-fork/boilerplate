import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import { SortableItem } from "./SortableItem";
import { Item } from "./Item";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import "./GrantShowOverview.css";

import {
  DndContext,
  // PointerSensor,
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

export default function GrantShowOverview() {
  const sensors = useSensors(useSensor(MouseSensor));
  const [sortableSections, setSortableSections] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const { organizationClient } = useCurrentOrganization();
  const { grantId } = useParams();

  const {
    data: grant,
    isError,
    isLoading,
    error,
  } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );

  useEffect(() => {
    setSortableSections(grant.sections);
  }, [grantId, grant.sections, setSortableSections]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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
        return arrayMove(items, oldIndex, newIndex);
      };
      setSortableSections(newSectionOrder);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
    >
      <div className="grants-show-overview">
        <div className="grants-show-overview__content">
          <div className="grants-show-overview__content-panels">
            <Container
              className="grants-show-overview__draggable-sections-container"
              as="section"
            >
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
          </div>
        </div>
      </div>
    </DndContext>
  );
}
