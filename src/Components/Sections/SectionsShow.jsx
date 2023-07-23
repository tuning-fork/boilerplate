import React from "react";
import { MdEditNote } from "react-icons/md";
import { ActionIcon, Group, Flex } from "@mantine/core";
import countSectionWords from "../../Helpers/countSectionWords";
import "./SectionsShow.css";

export default function SectionsShow(props) {
  const { section, onClickEdit } = props;

  return (
    <>
      <div className="section__header">
        <Group position="apart">
          <Flex align="center" gap="sm">
            <h2 className="section__title heading-4">{section.title}</h2>
            <ActionIcon onClick={() => onClickEdit(section.id)}>
              <MdEditNote className="section__edit-icon" />
            </ActionIcon>
          </Flex>
          <b>WORD COUNT: {countSectionWords(section)}</b>
        </Group>
      </div>
      <div dangerouslySetInnerHTML={{ __html: section.text }}></div>
    </>
  );
}
