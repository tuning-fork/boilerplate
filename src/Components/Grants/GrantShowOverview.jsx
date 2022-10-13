/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
import Container from "../design/Container/Container";
import SectionListItem from "../Sections/SectionListItem";
import countSectionWords from "../../Helpers/countSectionWords";
import countWords from "../../Helpers/countWords";
import "./GrantShowOverview.css";
import SortableElement from "../Elements/SortableElement";

export default function GrantShowOverview({ grant }) {
  return (
    <div className="grants-show-overview">
      <div className="grants-show-overview__content">
        <Container
          className="grants-show-overview__sections-container"
          as="section"
          centered
        >
          <ol className="grants-show__section-list">
            {grant.sections.length > 0 &&
              grant.sections.map((section) => (
                <SortableElement key={section.id} id={section.id}>
                  <SectionListItem section={section} />
                </SortableElement>
              ))}
          </ol>
        </Container>
      </div>
    </div>
  );
}
