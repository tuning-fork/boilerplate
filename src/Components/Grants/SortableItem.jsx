import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "./Item";
import countSectionWords from "../../Helpers/countSectionWords";
import "./SortableItem.css";
import { MdDragIndicator } from "react-icons/md";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      item={props.item}
      id={props.id}
    >
      <article className="sortable-item" data-testid={props.item.title}>
        <MdDragIndicator className="sortable-item__icon" />
        <p className="sortable-item__title">{props.item.title}</p>
        <div>
          <b>WORD COUNT: {countSectionWords(props.item)}</b>
        </div>
      </article>
    </Item>
  );
}
