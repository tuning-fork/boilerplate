import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
import Modal from "../design/Modal/Modal";
import Container from "../design/Container/Container";
import Hero from "../design/Hero/Hero";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as GrantReportsService from "../../Services/Organizations/Grants/GrantReportsService";
import {
  createReportSection,
  updateReportSection,
} from "../../Services/Organizations/Grants/Reports/ReportSectionsService";
import countSectionWords from "../../Helpers/countSectionWords";
import countWords from "../../Helpers/countWords";
import SectionsShow from "../Sections/SectionsShow";
import SectionForm from "../Sections/SectionForm";
import SortableElement from "../Elements/SortableElement";
import StoreSectionAsBoilerplate from "../Sections/StoreSectionAsBoilerplate";
import "./ReportsShow.css";
// import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
// import PasteBoilerplateContentPopout from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopout";

export default function ReportsShow() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newReportSectionUuid, setNewReportSectionUuid] = useState(null);
  const [editingReportSectionUuid, setEditingReportSectionUuid] =
    useState(null);
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const totalWordCount = useMemo(
    () =>
      report?.reportSections.reduce(
        (total, reportSection) => total + countSectionWords(reportSection),
        0
      ),
    [report.reportSections]
  );

  const { grantUuid, reportUuid } = useParams();
  // const { isOpen } = useContext(PasteBoilerplateContentPopoutContext);

  const [sectionToStoreAsBoilerplate, setSectionToStoreAsBoilerplate] =
    useState(null);

  const getGrantReport = useCallback(() => {
    if (!organizationClient) {
      return;
    }
    GrantReportsService.getGrantReport(
      organizationClient,
      grantUuid,
      reportUuid
    )
      .then((report) => setReport(report))
      .catch((error) => setErrors([error]))
      .finally(() => setLoading(false));
  }, [organizationClient, grantUuid, reportUuid]);

  const handleCreateReportSection = ({
    newReportSectionFields,
    precedingReportSection,
  }) => {
    createReportSection(organizationClient, grantUuid, reportUuid, {
      title: newReportSectionFields.title,
      text: newReportSectionFields.html,
      grantUuid,
      reportUuid,
      sort_order: precedingReportSection
        ? precedingReportSection.sortOrder + 1
        : 0,
      wordcount: countWords(newReportSectionFields.text),
    }).then(() => {
      alert("Report Section created!");
      setNewReportSectionUuid(null);
      return getGrantReport();
    });
  };

  const handleEditReportSection = (newReportSectionFields) => {
    updateReportSection(
      organizationClient,
      grantUuid,
      newReportSectionFields.uuid,
      {
        title: newReportSectionFields.title,
        text: newReportSectionFields.html,
        wordcount: countWords(newReportSectionFields.text),
      }
    ).then(() => {
      alert("Report Section edited!");
      setEditingReportSectionUuid(null);
      return getGrantReport();
    });
  };

  useEffect(() => {
    getGrantReport();
  }, [getGrantReport]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  const noReportSectionsContent = newReportSectionUuid ? (
    <SectionForm
      onStoreSectionAsBoilerplate={setSectionToStoreAsBoilerplate}
      onSubmit={(newReportSectionFields) =>
        handleCreateReportSection({ newReportSectionFields })
      }
      onCancel={() => setNewReportSectionUuid(null)}
    />
  ) : (
    <>
      <p className="reports-show__welcome-alert">
        Welcome to your grant! Get started by clicking the Add Section Button
        below.
      </p>
      <Button onClick={() => setNewReportSectionUuid(1)} variant="text">
        <MdAddCircle />
        Add Section
      </Button>
    </>
  );

  return (
    <div className="reports-show">
      {/* {isOpen && (
        <div className="reports-show__paste-boilerplate-popout">
          <PasteBoilerplateContentPopout />
        </div>
      )} */}
      <div className="reports-show__content">
        <Hero
          headerText={report.title}
          // fundingOrgText={report.fundingOrgName}
          // rfpWebsiteText={report.rfpUrl}
          // purposeText={report.purpose}
          fundingOrgText={"funding org name"}
          rfpWebsiteText={"rfp url"}
          purposeText={"purpose"}
          deadline={report.deadline}
          totalWordCount={totalWordCount}
          breadCrumbLink={`/organizations/${currentOrganization.uuid}/reports/`}
          copyLink={`/reports/${report.uuid}/copy/`}
          editLink={`/reports/${report.uuid}/edit/`}
        />
        <Container
          className="reports-show__sections-container"
          as="section"
          centered
        >
          {report.reportSections.length ? (
            <ol className="reports-show__section-list">
              {report.reportSections.map((reportSection) => (
                <SortableElement
                  key={reportSection.uuid}
                  id={reportSection.uuid}
                >
                  {editingReportSectionUuid === reportSection.uuid ? (
                    <SectionForm
                      onStoreSectionAsBoilerplate={
                        setSectionToStoreAsBoilerplate
                      }
                      onSubmit={handleEditReportSection}
                      onCancel={() => setEditingReportSectionUuid(null)}
                      section={reportSection}
                    />
                  ) : (
                    <SectionsShow
                      section={reportSection}
                      onClickEdit={setEditingReportSectionUuid}
                    />
                  )}
                  {newReportSectionUuid === reportSection.uuid && (
                    <SectionForm
                      onStoreSectionAsBoilerplate={
                        setSectionToStoreAsBoilerplate
                      }
                      onSubmit={(newReportSectionFields) =>
                        handleCreateReportSection({
                          newReportSectionFields,
                          precedingReportSection: reportSection,
                        })
                      }
                      onCancel={() => setNewReportSectionUuid(null)}
                    />
                  )}
                  <Button
                    onClick={() => setNewReportSectionUuid(reportSection.uuid)}
                    variant="text"
                  >
                    <MdAddCircle />
                    Add Report Section
                  </Button>
                </SortableElement>
              ))}
            </ol>
          ) : (
            noReportSectionsContent
          )}
        </Container>
      </div>
      <Modal
        show={!!sectionToStoreAsBoilerplate}
        heading="Store Report Section as Boilerplate"
      >
        <StoreSectionAsBoilerplate
          section={sectionToStoreAsBoilerplate}
          onClose={() => setSectionToStoreAsBoilerplate(null)}
        />
      </Modal>
    </div>
  );
}
