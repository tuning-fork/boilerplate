import React, { useState, useEffect, useCallback, useContext } from "react";
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
import { PasteBoilerplateContentPopoutContext } from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopoutContext";
import PasteBoilerplateContentPopout from "../PasteBoilerplateContentPopout/PasteBoilerplateContentPopout";

function countTotalSectionsWords(reportSections = []) {
  return reportSections?.reduce(
    (total, reportSection) => total + countSectionWords(reportSection),
    0
  );
}

export default function ReportsShow() {
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

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import ReportSectionsNew from "../ReportSections/ReportSectionsNew";
// import ReportSectionsShow from "../ReportSections/ReportSectionsShow";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import { useHistory } from "react-router-dom";
// import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
// import ReportEditForm from "../Reports/ReportEditForm";
// import {
//   getGrantReport,
//   updateGrantReport,
//   deleteGrantReport,
// } from "../../Services/Organizations/Grants/GrantReportsService";
// import { getAllBoilerplates } from "../../Services/Organizations/BoilerplatesService";

// export default function ReportsShow(props) {
//   const [id, setId] = useState(props.match.params.report_id);
//   const [grantId, setGrantId] = useState(props.match.params.grant_id);
//   const [title, setTitle] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [submitted, setSubmitted] = useState("");
//   const [_boilerplates, setBoilerplates] = useState([]);
//   const [isHidden, setIsHidden] = useState(true);
//   const [isGrantHidden, setIsGrantHidden] = useState(true);
//   const [grantTitle, _setGrantTitle] = useState("");
//   const [grantSections, setGrantSections] = useState([]);
//   const [reportSections, setReportSections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const history = useHistory();

//   const { currentOrganization, organizationClient } = useCurrentOrganization();

//   const [_newTitle, setNewTitle] = useState("");
//   const [_newDeadline, setNewDeadline] = useState("");
//   const [_newSubmitted, setNewSubmitted] = useState("");

//   const [_show, setShow] = useState(false);
//   const handleClose = () => setShow(false);

//   useEffect(() => {
//     if (currentOrganization.id) {
//       const grantId = props.match.params.grant_id;
//       const reportId = id;
//       getGrantReport(organizationClient, grantId, reportId)
//         .then((report) => {
//           setId(report.id);
//           setGrantId(report.grant_id);
//           setTitle(report.title);
//           setDeadline(report.deadline);
//           setSubmitted(report.submitted);
//           setReportSections(report.report_sections);
//           setGrantSections(report.grant.grant_sections);
//           setLoading(false);
//           setNewTitle(report.title);
//           setNewDeadline(report.deadline);
//           setNewSubmitted(report.submitted);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//       getAllBoilerplates(organizationClient)
//         .then((boilerplates) => {
//           setBoilerplates(boilerplates);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [
//     currentOrganization.id,
//     id,
//     organizationClient,
//     props.match.params.grant_id,
//   ]);

//   const toggleHidden = () => {
//     setIsHidden(!isHidden);
//   };

//   const toggleHiddenGrant = () => {
//     setIsGrantHidden(!isGrantHidden);
//   };

//   const handleSubmit = ({ newTitle, newDeadline, newSubmitted }) => {
//     const grantId = props.match.params.grant_id;
//     const reportId = props.match.params.report_id;
//     updateGrantReport(
//       organizationClient,
//       grantId,
//       reportId,
//       {
//         grant_id: grantId,
//         title: newTitle,
//         deadline: newDeadline,
//         submitted: newSubmitted,
//       },
//       { headers: { Authorization: `Bearer ${localStorage.token}` } }
//     )
//       .then((report) => {
//         toggleHidden();
//         setNewTitle(report.title);
//         setNewDeadline(report.deadline);
//         setNewSubmitted(report.submitted);
//       })
//       .catch((error) => {
//         console.error("report update error", error);
//       });
//   };

//   const handleCancel = () => {
//     setNewTitle(title);
//     setNewDeadline(deadline);
//     setNewSubmitted(submitted);
//     handleClose();
//   };

//   const updateReportSections = (newReportSection) => {
//     let newReportSections = [...reportSections, newReportSection];
//     setReportSections(newReportSections);
//   };

//   const editReportSections = (editedReportSection) => {
//     const newReportSections = reportSections.map((reportSection) => {
//       if (reportSection.id === editedReportSection.id) {
//         reportSection = editedReportSection;
//       }
//       return reportSection;
//     });
//     setReportSections(newReportSections);
//   };

//   const deleteReportSections = (deletedReportSection) => {
//     let newReportSections = [...reportSections];
//     let newArr = [];
//     newReportSections.forEach((newReportSection) => {
//       if (newReportSection.id !== deletedReportSection.id) {
//         newArr.push(newReportSection);
//       }
//     });
//     setReportSections(newArr);
//   };

//   const handleReportDelete = () => {
//     const grantId = props.match.params.grant_id;
//     const reportId = props.match.params.report_id;
//     deleteGrantReport(organizationClient, grantId, reportId)
//       .then((report) => {
//         if (report.message) {
//           history.push("/grants/" + grantId);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const renderedSections = grantSections.map((grant_section) => {
//     return (
//       <div key={grant_section.id}>
//         <h3>{grant_section.title}</h3>
//         <h3 dangerouslySetInnerHTML={{ __html: grant_section.text }}></h3>
//         <h3>{grant_section.wordcount}</h3>
//       </div>
//     );
//   });

//   if (loading) {
//     return (
//       <div className="container">
//         <h1>Loading....</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="component container">
//       <h1>Report Show - Build Draft Report Sections</h1>
//       <Card>
//         <Card.Header>
//           <h2>{title}</h2>
//         </Card.Header>
//         <Card.Body>
//           <h3>Deadline: {deadline}</h3>
//           <h3>Submitted: {submitted ? "yes" : "not yet"}</h3>
//         </Card.Body>
//       </Card>

//       {/* Associated grant */}

//       <Button onClick={toggleHiddenGrant}>Show Associated Grant</Button>
//       <Button onClick={toggleHidden}>Update Report</Button>

//       {!isGrantHidden ? (
//         <Card>
//           <Card.Header>
//             <h1>Associated Grant</h1>
//             <h2>{grantTitle}</h2>
//           </Card.Header>

//           <Card.Body>{renderedSections}</Card.Body>
//         </Card>
//       ) : null}

//       {/* beginning of report update */}

//       <div className="container">
//         <br />
//         <br />
//         {!isHidden ? (
//           <Card>
//             <Card.Body>
//               <ReportEditForm
//                 title={title}
//                 deadline={deadline}
//                 submitted={submitted}
//                 onSubmit={handleSubmit}
//                 onCancel={handleCancel}
//               />
//             </Card.Body>
//           </Card>
//         ) : null}
//       </div>

//       {/* New report section */}

//       <ReportSectionsNew
//         report_id={id}
//         grant_id={props.grant_id}
//         sort_number={reportSections.length}
//         updateReportSections={updateReportSections}
//       />
//       <br />

//       {/* Report sections */}

//       <Card>
//         <Card.Header>
//           <h3>Report Sections:</h3>
//         </Card.Header>
//         <Card.Body>
//           {reportSections?.length ? (
//             reportSections.map((reportSection) => {
//               return (
//                 <div key={reportSection.id}>
//                   <ReportSectionsShow
//                     report_id={id}
//                     grant_id={props.grant_id}
//                     report_section_id={reportSection.id}
//                     editReportSections={editReportSections}
//                     deleteReportSections={deleteReportSections}
//                   />
//                 </div>
//               );
//             })
//           ) : (
//             <h4>There are no report sections yet.</h4>
//           )}
//         </Card.Body>
//       </Card>
//       <br />

//       <Link
//         to={`/organizations/${currentOrganization.id}/grants/${grantId}/reports-finalize/${id}`}
//       >
//         <Button>Report Finalize</Button>
//       </Link>

//       <Button variant="danger" onClick={handleReportDelete}>
//         Delete Report
//       </Button>
//     </div>
//   );
// }
