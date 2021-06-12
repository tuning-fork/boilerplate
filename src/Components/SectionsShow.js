import React, { useState, useEffect, useCallback } from "react";
import countSectionWords from "../Helpers/countSectionWords";
import "./SectionsShow.css";
import { Button } from "react-bootstrap";
import Modal from "./Elements/Modal";
import SaveSectionAsBoilerplate from "./Sections/SaveSectionAsBoilerplate";

export default function SectionsShow(props) {
  const { section } = props;
  const [showSaveAsBoilerplateModal, setShowSaveAsBoilerplateModal] =
    useState(false);
  const handleShowSaveAsBoilerplateModal = (event) => {
    setShowSaveAsBoilerplateModal(true);
    console.log(`modal should render: ${showSaveAsBoilerplateModal}`);
    console.log("hi!");
  };
  const handleCloseSaveAsBoilerplateModal = (event) =>
    setShowSaveAsBoilerplateModal(false);

  return (
    <>
      <div className="Section__Header">
        <h1 className="Section__Title">{section.title}</h1>
        <Button onClick={handleShowSaveAsBoilerplateModal}>
          Save Section as Boilerplate
        </Button>
        <p>Word count: {countSectionWords(section)}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
      <Modal
        className="modal-popup"
        onClose={handleCloseSaveAsBoilerplateModal}
        show={showSaveAsBoilerplateModal}
      >
        <SaveSectionAsBoilerplate section={section} />
      </Modal>
    </>
  );
}
