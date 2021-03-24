import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import SectionsUpdateFinal from './SectionsUpdateFinal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

export default function GrantsFinalizeShow() {
  // constructor(props) {
  //   super(props);

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [rfpUrl, setRfpUrl] = useState("");
    const [deadline, setDeadline] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [purpose, setPurpose] = useState("");
    const [organizationId, setOrganizationId] = useState("");
    const [organizationName, setOrganizationName] = useState("")
    const [fundingOrgId, setFundingOrgId] = useState("");
    const [sections, setSections] = useState([]);
    const [reports, setReports] = useState([]);
    const [fundingOrgs, setFundingOrgs] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
    const [isCopyGrantHidden, setIsCopyGrantHidden] = useState(true);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [bios, setBios] = useState([]);
    const [boilerplates, setBoilerplates] = useState([]);
    const [copyTitle, setCopyTitle] = useState("");
    const [copyRfpUrl, copyRfpUrl] = useState("");
    const [copyDeadline, setCopyDeadline] = useState("");
    const [successfulCopy, setSuccessfulCopy] = useState(false);
    const [copiedGrantId, setCopiedGrantId] = useState("");
    const [showCopyModal, setShowCopyModal] = useState(false);


  const createUnzipped = (sections) => {
    return sections.map((section) => {
      section.isUnzipped = false
      return section
    })
  }

  const toggleUnzipped = (id, bool) => {
    const alteredSections = sections.map((sectionKey) => {
      if (id === sectionKey.id) {
        sectionKey.isUnzipped = bool
      }
      console.log(sectionKey)
      return sectionKey
    })
    setSections(alteredSections)
  }

  useEffect(() => {
    axios
      .get(`/api/grants/${props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        const zippySections = createUnzipped(response.data.sections);
        setId(response.data.id);
        setTitle(response.data.title);
        setRfpUrl(response.data.rfp_url);
        setDeadline(response.data.deadline);
        setSubmitted(response.data.submitted);
        setSuccessful(response.data.successful);
        setPurpose(response.data.purpose);
        setOrganizationId(response.data.organizion_id);
        setOrganizationName(response.data.organization_name);
        setFundingOrgId(response.data.funding_org_id);
        setSections(zippySections);
        setReports(response.data.reports);
        setLoading(false);
      })
    axios
      .get('/api/boilerplates',
        {headers: { Authorization: `Bearer ${localStorage.token}` }}) 
      .then((response) => {
        setBoilerplates(response.data); 
      })
    axios
      .get('/api/bios',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        setBios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  }

  const toggleCopyGrantHidden = () => {
    setIsCopyGrantHidden(!isCopyGrantHidden);

  }

  const handleHideCopyModal = () => {
    setShowCopyModal(false);
  }

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCopyChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, rfp_url, deadline, submitted, successful, purpose, organization_id, funding_org_id } = this.state;
    axios
      .patch(
        '/api/grants/' + id,
        {
          title: title,
          rfp_url: rfpUrl,
          deadline: deadline,
          submitted: submitted,
          successful: successful,
          purpose: purpose,
          sections: [],
          organization_id: organizationId,
          funding_org_id: fundingOrgId,
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('grant update error', error);
      });
  }

  copyGrant = (event) => {
    event.preventDefault();
    const { copy_title, copy_rfp_url, copy_deadline, id} = this.state;
    axios
      .post('/api/grants/copy', 
        {
          original_grant_id: id,
          title: copyTitle,
          rfp_url: copyRfpUrl,
          deadline: copyDeadline
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        console.log(response.data.id)
        setCopiedGrantId(response.data.id);
        setShowCopyModal(true);
        setSuccessfulCopy(true);
        toggleCopyGrantHidden();
      })
      .catch((error) => {
        console.log('grant copy error', error);
        setShowCopyModal(true);
        setSuccessfulCopy(false);
      })
  }

  const handleSectionDelete = () => {
    axios
      .delete('/api/sections/' + props.section.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSections = (newSection) => {
    const sections = sections.map(section => 
      {
        if (section.id === newSection.id) {
        section.title = newSection.title
        section.text = newSection.text
        section.wordcount = newSection.wordcount
      }
      return section
      });
    setSections(sections);
  }

    if (loading) {
      return <h1>Loading....</h1>;
    }

    return (
      <div className="component">
      <h1>Grants Finalize Page - View Grant Draft, Make Final Edits</h1>
        <h1>{title}</h1>
        <h2>{organizationName}</h2>
        <h2>{purpose}</h2>
        <div>
        {/* beginning of grant update */}
          <div className="container">
          <br />
          {isHidden ?
            <Button onClick={toggleHidden}>
              Update Grant
            </Button> :
            <Button
              onClick={toggleHidden}
            >
              Close
            </Button>
          }
          <br />
          {!isHidden ? (
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>RFP URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={rfpUrl}
                    name="rfpUrl"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="datetime"
                    value={deadline}
                    name="deadline"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Submitted</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="submitted"
                    checked={submitted}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Successful</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="successful"
                    checked={successful}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    type="text"
                    value={purpose}
                    name="purpose"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          ) : null}
        </div>
        {/* beginning of copy grant feature */}
        <Button onClick={toggleCopyGrantHidden}>Copy Grant</Button>
        {/* modal for grant copy confirm message */}
        <Modal show={showCopyModal} onHide={handleHideCopyModal}>
          <Modal.Header closeButton></Modal.Header>
          {successfulCopy ? (
            <Card>
              <Card.Body>
                <Alert variant="success">
                  <Alert.Heading>Congrats! You've created a copy. View your copy 
                  <Alert.Link href={`/grants/${copiedGrantId}`}> here</Alert.Link>.
                  </Alert.Heading>
                </Alert>
              </Card.Body>
            </Card>
            ) : 
            <Card>
              <Alert variant="danger">
                <Alert.Heading>Oops! You haven't created a copy. Please close this pop up and try again.</Alert.Heading>
              </Alert>
            </Card>
          }
        </Modal>
        {/* end of modal for grant copy confirm message */}
        <Card>
        {!isCopyGrantHidden ? (
        <Card.Body>
        <Form onSubmit={copyGrant}>
        <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="copyTitle"
                value={copyTitle}
                onChange={handleCopyChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>RFP URL</Form.Label>
              <Form.Control
                name="copyRfpUrl"
                value={copyRfpUrl}
                onChange={handleCopyChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                name="copyDeadline"
                value={copyDeadline}
                onChange={handleCopyChange}
                required
              />
            </Form.Group>
            <Button type="submit">
                Create Copy
            </Button>
          </Form>
          </Card.Body>
          ) : null}
          </Card>
          {/* end of copy grant feature */}

          {sections.map(section => {
            return(
              <div key={section.id}>
                <SectionsUpdateFinal 
                  isUnzipped={section.isUnzipped}
                  toggleUnzipped={toggleUnzipped}
                  section_id={section.id}
                  boilerplates={boilerplates}
                  bios={bios}
                  // section_title={section.title}
                  // section_text={section.text}
                  // section_grant_id={state.id}
                  updateSections={updateSections}
                />
              </div>
            )
          })}
        </div>  
      </div>
    );
  }

