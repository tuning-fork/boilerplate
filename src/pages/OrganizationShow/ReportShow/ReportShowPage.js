import React, { useState, useEffect, useCallback } from "react";
import { MdAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "components/design/Button/Button";
import Modal from "components/design/Modal/Modal";
import Container from "components/design/Container/Container";
import Hero from "components/design/Hero/Hero";
import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import * as GrantReportsService from "services/p0/Organizations/Grants/GrantReportsService";
import {
  createReportSection,
  updateReportSection,
} from "services/p0/Organizations/Grants/Reports/ReportSectionsService";
import countSectionWords from "lib/countSectionWords";
import countWords from "lib/countWords";
import SectionsShow from "../Sections/SectionsShow";
import SectionForm from "../Sections/SectionForm";
import SortableElement from "components/SortableElement";
import StoreSectionAsBoilerplate from "../Sections/StoreSectionAsBoilerplate";
import "./ReportShowPage.css";
// import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
// import PasteBoilerplateContentPopout from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopout";

function countTotalSectionsWords(reportSections = []) {
  return reportSections?.reduce(
    (total, reportSection) => total + countSectionWords(reportSection),
    0
  );
}

export default function ReportShowPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [newReportSectionId, setNewReportSectionId] = useState(null);
  const [editingReportSectionId, setEditingReportSectionId] = useState(null);
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const totalWordCount = countTotalSectionsWords(report?.report_sections);

  const { grant_id: grantId } = useParams();
  const { report_id: reportId } = useParams();
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
      grant_id: grantId,
      report_id: reportId,
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
