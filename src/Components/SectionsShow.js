import React from "react";
import countSectionWords from "../Helpers/countSectionWords";
import "./SectionsShow.css";
import { Button } from "react-bootstrap";

export default function SectionsShow(props) {
  const { section, onSaveSectionAsBoilerplate = () => {} } = props;

  return (
    <>
      <div className="Section__Header">
        <h1 className="Section__Title">{section.title}</h1>
        <Button onClick={() => onSaveSectionAsBoilerplate(section)}>
          Save Section as Boilerplate
        </Button>
        <p>Word count: {countSectionWords(section)}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
    </>
  );
}
