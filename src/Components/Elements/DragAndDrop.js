import React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableElement from "./SortableElement";

export default function DragAndDrag(props) {
  const { onDragEnd, items, children, className } = props;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ol className={className}>
          {children.map((child) => (
            <SortableElement key={child.key} id={child.key}>
              {child}
            </SortableElement>
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  );
}
