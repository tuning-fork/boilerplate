import React from "react";
import countSectionWords from "../../Helpers/countSectionWords";
import "./SectionListItem.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SectionListItem(props) {
  const { section } = props;

  const { setNodeRef, attributes, listeners, transition, transform } =
    useSortable({ id: section.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      className="section-list-item"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <article className="section">
        <p className="section__title">{section.title}</p>
        <div className="section__wordcount">
          <b>WORD COUNT: {countSectionWords(section)}</b>
        </div>
      </article>
    </li>
  );
}
