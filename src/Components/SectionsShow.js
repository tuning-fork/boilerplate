import React from "react";
import { MdEditNote } from "react-icons/md";
import Button from "./design/Button/Button";
import countSectionWords from "../Helpers/countSectionWords";
import "./SectionsShow.css";

export default function SectionsShow(props) {
  const { section, onClickEdit } = props;

  return (
    <>
      <div className="section__header">
        <h2 className="section__title heading-4">
          {section.title}{" "}
          <Button variant="none" onClick={() => onClickEdit(section.id)}>
            <MdEditNote />
          </Button>
        </h2>

        <b>WORD COUNT: {countSectionWords(section)}</b>
      </div>
      <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
    </>
  );
}
