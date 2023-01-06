import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
import Checkbox from "../design/Checkbox/Checkbox";
import Container from "../design/Container/Container";
import Hero from "../design/Hero/Hero";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantsService from "../../Services/Organizations/GrantsService";
import * as SectionsService from "../../Services/Organizations/Grants/SectionsService";
// import countSectionWords from "../../Helpers/countSectionWords";
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

  // const placeholderText =
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna condimentum mattis pellentesque id nibh tortor id aliquet lectus. Non tellus orci ac auctor augue. Adipiscing elit pellentesque habitant morbi. Mauris pellentesque pulvinar pellentesque habitant morbi. Faucibus ornare suspendisse sed nisi lacus. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan. Maecenas pharetra convallis posuere morbi leo urna. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Sagittis nisl rhoncus mattis rhoncus urna neque. In ornare quam viverra orci sagittis eu volutpat odio. Nascetur ridiculus mus mauris vitae ultricies leo integer. Et netus et malesuada fames ac turpis egestas sed. Mauris cursus mattis molestie a. Odio morbi quis commodo odio aenean sed adipiscing. Congue eu consequat ac felis donec et odio. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Dui sapien eget mi proin sed libero enim sed. Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Mi quis hendrerit dolor magna eget est lorem. Bibendum neque egestas congue quisque egestas diam. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Aenean vel elit scelerisque mauris pellentesque. Enim ut tellus elementum sagittis vitae et leo duis. Varius duis at consectetur lorem donec. Tincidunt vitae semper quis lectus nulla. Praesent tristique magna sit amet purus gravida. Lobortis feugiat vivamus at augue. Blandit volutpat maecenas volutpat blandit. Nunc lobortis mattis aliquam faucibus. Lacus vel facilisis volutpat est velit. Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Cursus metus aliquam eleifend mi. Purus semper eget duis at tellus at urna condimentum mattis. Ut placerat orci nulla pellentesque dignissim enim. Porttitor leo a diam sollicitudin tempor id. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Id interdum velit laoreet id donec ultrices tincidunt arcu. Ultrices eros in cursus turpis massa tincidunt dui ut. Duis tristique sollicitudin nibh sit amet. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Suspendisse potenti nullam ac tortor vitae. Diam quam nulla porttitor massa id neque aliquam. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Venenatis a condimentum vitae sapien pellentesque. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Velit dignissim sodales ut eu. Arcu dui vivamus arcu felis bibendum ut tristique et. Rutrum quisque non tellus orci ac auctor. Pharetra convallis posuere morbi leo urna. Molestie at elementum eu facilisis sed odio morbi quis commodo. Sit amet commodo nulla facilisi nullam vehicula ipsum. Massa vitae tortor condimentum lacinia quis vel eros. Quam quisque id diam vel. Duis ut diam quam nulla. Orci nulla pellentesque dignissim enim. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Vitae tortor condimentum lacinia quis vel. Nunc lobortis mattis aliquam faucibus purus in massa. Lacus suspendisse faucibus interdum posuere lorem ipsum. Cras adipiscing enim eu turpis. Tristique et egestas quis ipsum suspendisse ultrices. Ridiculus mus mauris vitae ultricies leo integer malesuada.";

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
    props.setSortableSections(grant.sections);
    props.setReorderHistory([grant.sections]);
    props.setReorderIndex(0);
  }, [grantId]);

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
        variant="outlined"
        as={CurrentOrganizationLink}
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
            <div className="grants-show-overview__save-button">
              <Button
                onClick={() => {
                  grantSectionsReorder();
                }}
                disabled={!props.canSaveReorder}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  onUndo();
                }}
                disabled={Boolean(props.reorderIndex === 0)}
              >
                Undo
              </Button>
              <Button
                onClick={() => {
                  onRedo();
                }}
                disabled={Boolean(
                  props.reorderIndex + 1 === props.reorderHistory.length ||
                    props.reorderHistory.length <= 1
                )}
              >
                Redo
              </Button>
            </div>
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
