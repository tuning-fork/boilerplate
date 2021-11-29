import React from "react";
import countSectionWords from "../Helpers/countSectionWords";
import "./SectionsShow.css";

export default function SectionsShow(props) {
  const { section } = props;

  return (
    <>
      <div className="section__header">
        <h2 className="section__title heading-4">{section.title}</h2>
        <b>WORD COUNT: {countSectionWords(section)}</b>
      </div>
      <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
    </>
  );
}
