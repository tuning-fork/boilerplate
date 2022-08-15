import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "../design/Button/Button";
import Modal from "../design/Modal/Modal";
import Container from "../design/Container/Container";
import Hero from "../design/Hero/Hero";
import { useCurrentOrganization } from "../../contexts/currentOrganizationContext";
import * as GrantReportsService from "../../services/Organizations/Grants/GrantReportsService";
import {
  createReportSection,
  updateReportSection,
} from "../../services/Organizations/Grants/Reports/ReportSectionsService";
import countSectionWords from "../../utils/countSectionWords";
import countWords from "../../utils/countWords";
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
  const [newReportSectionId, setNewReportSectionId] = useState(null);
  const [editingReportSectionId, setEditingReportSectionId] = useState(null);
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const totalWordCount = useMemo(
    () =>
      report?.reportSections.reduce(
        (total, reportSection) => total + countSectionWords(reportSection),
        0
      ),
    [report.reportSections]
  );

  const { grantId, reportId } = useParams();
  // const { isOpen } = useContext(PasteBoilerplateContentPopoutContext);

  const [sectionToStoreAsBoilerplate, setSectionToStoreAsBoilerplate] =
    useState(null);

  const getGrantReport = useCallback(() => {
    if (!organizationClient) {
      return;
    }
    GrantReportsService.getGrantReport(organizationClient, grantId, reportId)
      .then((report) => setReport(report))
      .catch((error) => setErrors([error]))
      .finally(() => setLoading(false));
  }, [organizationClient, grantId, reportId]);

  const handleCreateReportSection = ({
    newReportSectionFields,
    precedingReportSection,
  }) => {
    createReportSection(organizationClient, grantId, reportId, {
      title: newReportSectionFields.title,
      text: newReportSectionFields.html,
      grantId,
      reportId,
      sort_order: precedingReportSection
        ? precedingReportSection.sortOrder + 1
        : 0,
      wordcount: countWords(newReportSectionFields.text),
    }).then(() => {
      alert("Report Section created!");
      setNewReportSectionId(null);
      return getGrantReport();
    });
  };

  const handleEditReportSection = (newReportSectionFields) => {
    updateReportSection(
      organizationClient,
      grantId,
      newReportSectionFields.id,
      {
        title: newReportSectionFields.title,
        text: newReportSectionFields.html,
        wordcount: countWords(newReportSectionFields.text),
      }
    ).then(() => {
      alert("Report Section edited!");
      setEditingReportSectionId(null);
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

  const noReportSectionsContent = newReportSectionId ? (
    <SectionForm
      onStoreSectionAsBoilerplate={setSectionToStoreAsBoilerplate}
      onSubmit={(newReportSectionFields) =>
        handleCreateReportSection({ newReportSectionFields })
      }
      onCancel={() => setNewReportSectionId(null)}
    />
  ) : (
    <>
      <p className="reports-show__welcome-alert">
        Welcome to your grant! Get started by clicking the Add Section Button
        below.
      </p>
      <Button onClick={() => setNewReportSectionId(1)} variant="text">
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
          breadCrumbLink={`/organizations/${currentOrganization.id}/reports/`}
          copyLink={`/reports/${report.id}/copy/`}
          editLink={`/reports/${report.id}/edit/`}
        />
        <Container
          className="reports-show__sections-container"
          as="section"
          centered
        >
          {report.reportSections.length ? (
            <ol className="reports-show__section-list">
              {report.reportSections.map((reportSection) => (
                <SortableElement key={reportSection.id} id={reportSection.id}>
                  {editingReportSectionId === reportSection.id ? (
                    <SectionForm
                      onStoreSectionAsBoilerplate={
                        setSectionToStoreAsBoilerplate
                      }
                      onSubmit={handleEditReportSection}
                      onCancel={() => setEditingReportSectionId(null)}
                      section={reportSection}
                    />
                  ) : (
                    <SectionsShow
                      section={reportSection}
                      onClickEdit={setEditingReportSectionId}
                    />
                  )}
                  {newReportSectionId === reportSection.id && (
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
                      onCancel={() => setNewReportSectionId(null)}
                    />
                  )}
                  <Button
                    onClick={() => setNewReportSectionId(reportSection.id)}
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
