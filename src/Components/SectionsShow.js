import React, { useState, useEffect, useCallback } from "react";
import countSectionWords from "../Helpers/countSectionWords";
import "./SectionsShow.css";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Modal from "./Elements/Modal";
import SaveSectionAsBoilerplate from "./Sections/SaveSectionAsBoilerplate";

export default function SectionsShow(props) {
  const { section } = props;
  const [
    showSaveSectionAsBoilerplateModal,
    setShowSaveSectionAsBoilerplateModal,
  ] = useState(false);
  const handleShowSaveSectionAsBoilerplateModal = (event) =>
    setShowSaveSectionAsBoilerplateModal(true);
  const handleCloseSaveSectionAsBoilerplateModal = (event) =>
    setShowSaveSectionAsBoilerplateModal(false);

  return (
    <>
      <div className="Section__Header">
        <h1 className="Section__Title">{section.title}</h1>
        <Button type="submit" onClick={handleShowSaveSectionAsBoilerplateModal}>
          Save Section as Boilerplate
        </Button>
        <p>Word count: {countSectionWords(section)}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
      <Modal
        className="modal-popup"
        onClose={handleCloseSaveSectionAsBoilerplateModal}
        show={showSaveSectionAsBoilerplateModal}
      >
        <Card>
          <Card.Body>
            {/* <SaveSectionAsBoilerplate section={section} /> */}
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}
