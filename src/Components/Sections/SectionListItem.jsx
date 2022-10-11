import React from "react";
import countSectionWords from "../../Helpers/countSectionWords";
import "./SectionListItem.css";

export default function SectionListItem(props) {
  const { section } = props;

  return (
    <li className="section-list-item">
      <article className="section">
        <p className="section__title">{section.title}</p>
        <div className="section__wordcount">
          <b>WORD COUNT: {countSectionWords(section)}</b>
        </div>
      </article>
    </li>
  );
}
