import React, { useState, useEffect } from "react";
import FundingOrgsNew from "../FundingOrgs/FundingOrgsNew";
import { Link } from "react-router-dom";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { createGrant } from "../../Services/Organizations/GrantsService";
import { getAllFundingOrgs } from "../../Services/Organizations/FundingOrgsService";
import { useHistory } from "react-router-dom";
import LeftArrowIcon from "@material-ui/icons/KeyboardArrowLeft";
import Container from "../design/Container/Container";
import TextBox from "../design/TextBox/TextBox";
import Button from "../design/Button/Button";
import "./GrantsNew.css";

export default function GrantsNew(props) {
  // const [loading, setLoading] = useState(true);
  const [newGrant, setNewGrant] = useState({
    title: "",
    rfpUrl: "",
    deadline: "",
    purpose: "",
  });
  const [fundingOrgId, setFundingOrgId] = useState("");
  const [fundingOrgs, setFundingOrgs] = useState([]);
  // const [errors, setErrors] = useState("");
  const history = useHistory();
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const [showingFundingOrgsNew, setShowingFundingOrgsNew] = useState(false);
  const handleClose = () => {
    setShowingFundingOrgsNew(false);
  };

  useEffect(() => {
    if (currentOrganizationId) {
      getAllFundingOrgs(organizationClient)
        .then((fundingOrgs) => {
          setFundingOrgs(fundingOrgs);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId, organizationClient]);

  const handleCancel = () => {
    history.push(`/organizations/${currentOrganizationId}/grants`);
  };

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs];
    newFundingOrgs.push(newFundingOrg);
    setFundingOrgs(newFundingOrgs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createGrant(organizationClient, {
      ...newGrant,
      organization_id: currentOrganizationStore.currentOrganization.id,
      // fundingOrgId,
    })
      .then((grant) => {
        history.push(
          `/organizations/${currentOrganizationId}/grants/${grant.id}`
        );
      })
      .catch((error) => {
        console.log("grant creation error", error);
      });
  };

  return (
    <Container as="section" centered className="grants-new">
      <Link
        className="grants-new__back-button"
        to={`/organizations/${currentOrganizationId}/grants/`}
      >
        <LeftArrowIcon />
        Back to All Grants
      </Link>
      <h1>Add New Grant</h1>
      <form onSubmit={handleSubmit}>
        <Button
          variant="outlined"
          onClick={() => setShowingFundingOrgsNew(true)}
        >
          Add Funding Organization
        </Button>
        <TextBox labelText="Title" />
        <TextBox labelText="RFP URL" />
        <TextBox labelText="Deadline" />
        <TextBox labelText="Purpose" />
        <div className="grants-new__button-group">
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
      <FundingOrgsNew
        show={showingFundingOrgsNew}
        onClose={() => setShowingFundingOrgsNew(false)}
      />
    </Container>
  );

  // return (
  //   <Card>
  //     <Link to={`/organizations/${currentOrganizationId}/grants/`}>
  //       <p>Back to Grants</p>
  //     </Link>
  //     <Modal show={showFundingOrgsNew} onClose={handleClose}>
  //       <FundingOrgsNew
  //         funding_orgs={fundingOrgs}
  //         updateFundingOrgs={updateFundingOrgs}
  //       />
  //     </Modal>
  //     <Card.Header>Add New Grant</Card.Header>
  //     <Card.Body>
  //       <Form onSubmit={handleSubmit}>
  //         <Form.Group>
  //           <Form.Label>Funding Organization</Form.Label>
  //           <Form.Control
  //             as="select"
  //             name="fundingOrgId"
  //             value={fundingOrgId}
  //             onChange={(event) => setFundingOrgId(event.target.value)}
  //             required
  //           >
  //             <option value="" disabled>
  //               Funding Organization
  //             </option>
  //             {fundingOrgs.map((fundingOrg) => {
  //               return (
  //                 <option
  //                   key={fundingOrg.id}
  //                   value={fundingOrg.id}
  //                   onChange={(event) => setFundingOrgId(event.target.value)}
  //                 >
  //                   {fundingOrg.name}
  //                 </option>
  //               );
  //             })}
  //           </Form.Control>
  //         </Form.Group>
  //         <Button
  //           variant="secondary"
  //           size="sm"
  //           onClick={handleShowFundingOrgsNew}
  //         >
  //           Add New Funding Organization
  //         </Button>
  //         <br />
  //         <br />
  //         <Form.Group>
  //           <Form.Label>Title</Form.Label>
  //           <Form.Control
  //             type="text"
  //             name="title"
  //             value={title}
  //             onChange={(event) => setTitle(event.target.value)}
  //             required
  //           />
  //         </Form.Group>
  //         <Form.Group>
  //           <Form.Label>RFP URL</Form.Label>
  //           <Form.Control
  //             name="rfpUrl"
  //             value={rfpUrl}
  //             onChange={(event) => setRfpUrl(event.target.value)}
  //             required
  //           />
  //         </Form.Group>
  //         <Form.Group>
  //           <Form.Label>Deadline</Form.Label>
  //           <Form.Control
  //             type="datetime-local"
  //             name="deadline"
  //             value={deadline}
  //             onChange={(event) => setDeadline(event.target.value)}
  //             required
  //           />
  //         </Form.Group>
  //         <Form.Group>
  //           <Form.Label>Purpose</Form.Label>
  //           <Form.Control
  //             name="purpose"
  //             value={purpose}
  //             onChange={(event) => setPurpose(event.target.value)}
  //             required
  //           />
  //         </Form.Group>
  //         <div>
  //           <Button
  //             type="submit"
  //             style={{
  //               maxWidth: "50%",
  //               align: "center",
  //             }}
  //             onClick={handleSubmit}
  //           >
  //             Save Changes
  //           </Button>
  //           <Button
  //             style={{
  //               maxWidth: "50%",
  //               align: "center",
  //             }}
  //             onClick={handleCancelGrantNew}
  //           >
  //             Cancel
  //           </Button>
  //         </div>
  //       </Form>
  //     </Card.Body>
  //   </Card>
  // );
}
