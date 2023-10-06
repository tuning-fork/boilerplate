import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { Button, Group } from "@mantine/core";
import Checkbox from "../design/Checkbox/Checkbox";
import Container from "../design/Container/Container";
import Hero from "../design/Hero/Hero";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as SectionsService from "../../Services/Organizations/Grants/SectionsService";
import { SortableItem } from "./SortableItem";
import { Item } from "./Item";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import "./GrantShowOverview.css";

export default function GrantShowOverview(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { grantId } = useParams();
  const [checked, setChecked] = useState(false);
  const { setSortableSections, setReorderHistory, setReorderIndex } = props;

  const {
    data: grant,
    isError,
    isLoading,
    error,
  } = useQuery("getGrant", () =>
    GrantsService.getGrant(organizationClient, grantId)
  );

  const grantSectionsReorder = () => {
    const sectionsToReorder = [];
    props.sortableSections.forEach((newSection, index) => {
      const checkSection = grant.sections[index];
      if (newSection.sortOrder !== checkSection.sortOrder) {
        sectionsToReorder.push({
          id: newSection.id,
          sort_order: index,
        });
      }
    });
    if (sectionsToReorder.length > 0) {
      reorderSections(sectionsToReorder);
    }
  };

  useEffect(() => {
    setSortableSections(grant.sections);
    setReorderHistory([grant.sections]);
    setReorderIndex(0);
  }, [
    grantId,
    grant.sections,
    setSortableSections,
    setReorderHistory,
    setReorderIndex,
  ]);

  const onUndo = () => {
    if (props.reorderIndex > 0 && props.reorderIndex !== 1) {
      props.setSortableSections(props.reorderHistory[props.reorderIndex - 1]);
      props.updateState(props.reorderIndex - 1);
      props.setCanSaveReorder(true);
    } else if (props.reorderIndex === 1) {
      props.setSortableSections(props.reorderHistory[props.reorderIndex - 1]);
      props.updateState(props.reorderIndex - 1);
      props.setCanSaveReorder(false);
    }
  };

  const onRedo = () => {
    if (
      props.reorderIndex + 1 < props.reorderHistory.length &&
      props.reorderHistory.length > 1
    ) {
      props.setSortableSections(props.reorderHistory[props.reorderIndex + 1]);
      props.updateState(props.reorderIndex + 1);
      props.setCanSaveReorder(true);
    }
  };

  const { mutate: reorderSections } = useMutation(
    (sectionsToReorder) =>
      SectionsService.reorderSections(
        organizationClient,
        grantId,
        sectionsToReorder
      ),
    {
      onSuccess: () => {
        alert("Sections reordered!");
        props.setCanSaveReorder(false);
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const heroButtons = () => (
    <>
      <Button
        variant="light"
        component={CurrentOrganizationLink}
        to={`/grants/${grant.id}/`}
      >
        Content View
      </Button>
    </>
  );

  return (
    <div className="grants-show-overview">
      <div className="grants-show-overview__content">
        <Hero
          headerText={grant.title}
          fundingOrgText={grant.fundingOrgName}
          rfpWebsiteText={grant.rfpUrl}
          purposeText={grant.purpose}
          deadline={grant.deadline}
          totalWordCount={0}
          breadCrumbLink={`/organizations/${currentOrganization.id}/grants/`}
          contentLink={`/grants/${grant.id}/`}
          overviewToggle={true}
          grantId={grant.id}
          heroButtons={heroButtons()}
        />
        <div className="grants-show-overview__content-panels">
          <Container
            className="grants-show-overview__draggable-sections-container"
            as="section"
          >
            <Group position="right">
              <Button.Group>
                <Button
                  variant="light"
                  onClick={() => {
                    grantSectionsReorder();
                  }}
                  disabled={!props.canSaveReorder}
                >
                  Save
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    onUndo();
                  }}
                  disabled={props.reorderIndex === 0}
                >
                  Undo
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    onRedo();
                  }}
                  disabled={
                    props.reorderIndex + 1 === props.reorderHistory.length ||
                    props.reorderHistory.length <= 1
                  }
                >
                  Redo
                </Button>
              </Button.Group>
            </Group>
            <SortableContext
              items={props.sortableSections}
              strategy={verticalListSortingStrategy}
            >
              {props.sortableSections.map((item) => (
                <SortableItem key={item.id} id={item.id} item={item} />
              ))}
            </SortableContext>
            <DragOverlay>
              {props.activeId ? <Item id={props.activeId} /> : null}
            </DragOverlay>
          </Container>
          <Container className="grants-show-overview__preview-container">
            <div className="grants-show-overview__preview-checkbox">
              <Checkbox
                labelText="Show Section Title"
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              >
                Show Section Title
              </Checkbox>
            </div>
            <div className="grants-show-overview__preview-text">
              {props.sortableSections.map((section) => {
                return (
                  <React.Fragment key={section.id}>
                    {!!checked && (
                      <div
                        className="grants-show-overview__preview-title"
                        dangerouslySetInnerHTML={{ __html: section.title }}
                      ></div>
                    )}
                    <div
                      dangerouslySetInnerHTML={{ __html: section.text }}
                    ></div>
                  </React.Fragment>
                );
              })}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
