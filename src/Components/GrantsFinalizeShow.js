import React, { Component } from 'react';
import axios from 'axios';
import SectionsUpdateFinal from './SectionsUpdateFinal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

class GrantsFinalizeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: false,
      successful: false,
      purpose: "",
      organization_id: "",
      organization_name: "",
      funding_org_id: "",
      sections: [],
      reports: [],
      funding_orgs: [],
      isHidden: true,
      isCopyGrantHidden: true,
      loading: true,
      errors: [],
      bios: [],
      boilerplates: [],
      copy_title: "",
      copy_rfp_url: "",
      copy_deadline: "",
      successful_copy: false,
      copied_grant_id: "",
      showCopyModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUnzipped = (sections) => {
    return sections.map((section) => {
      section.isUnzipped = false
      return section
    })
  }

  toggleUnzipped = (id, bool) => {
    const alteredSections = this.state.sections.map((sectionKey) => {
      if (id === sectionKey.id) {
        sectionKey.isUnzipped = bool
      }
      console.log(sectionKey)
      return sectionKey
    })
    this.setState({
      sections: alteredSections
    })
  }

  componentDidMount() {
    axios
      .get(`/api/grants/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        const zippySections = this.createUnzipped(response.data.sections);
        this.setState({
          id: response.data.id,
          title: response.data.title,
          rfp_url: response.data.rfp_url,
          deadline: response.data.deadline,
          submitted: response.data.submitted,
          successful: response.data.successful,
          purpose: response.data.purpose,
          organization_id: response.data.organizion_id,
          organization_name: response.data.organization_name,
          funding_org_id: response.data.funding_org_id,
          sections: zippySections,
          reports: response.data.reports,
          loading: false,
        });
      })
    axios
      .get('/api/boilerplates',
        {headers: { Authorization: `Bearer ${localStorage.token}` }}) 
      .then((response) => {
        this.setState({
          boilerplates: response.data
        }); 
      })
    axios
      .get('/api/bios',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          bios: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  toggleCopyGrantHidden = () => {
    this.setState({
      isCopyGrantHidden: !this.state.isCopyGrantHidden,
    });
  }

  handleHideCopyModal = () => {
    this.setState({
      showCopyModal: false
    })
  }

  handleChange(event) {
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
        '/api/grants/' + this.state.id,
        {
          title: title,
          rfp_url: rfp_url,
          deadline: deadline,
          submitted: submitted,
          successful: successful,
          purpose: purpose,
          sections: [],
          organization_id: organization_id,
          funding_org_id: funding_org_id,
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
          title: copy_title,
          rfp_url: copy_rfp_url,
          deadline: copy_deadline
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        console.log(response.data.id)
        this.setState({
          copied_grant_id: response.data.id,
          showCopyModal: true,
          successful_copy: true
        })
        this.toggleCopyGrantHidden();
      })
      .catch((error) => {
        console.log('grant copy error', error);
        this.setState({
          showCopyModal: true,
          successful_copy: false
        }) 
      })
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.copied_grant_id !== "") {
  //     this.handleShowCopyModal()
  //   }
  // }

  handleSectionDelete() {
    axios
      .delete('/api/sections/' + this.props.section.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSections = (newSection) => {
    const sections = this.state.sections.map(section => 
      {
        if (section.id === newSection.id) {
        section.title = newSection.title
        section.text = newSection.text
        section.wordcount = newSection.wordcount
      }
      return section
      });
    this.setState({
      sections: sections
    })
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }

    return (
      <div className="component">
      <h1>Grants Finalize Page - View Grant Draft, Make Final Edits</h1>
        <h1>{this.state.title}</h1>
        <h2>{this.state.organization_name}</h2>
        <h2>{this.state.purpose}</h2>
        <div>
        {/* beginning of grant update */}
          <div className="container">
          <br />
          {this.state.isHidden ?
            <Button onClick={this.toggleHidden.bind(this)}>
              Update Grant
            </Button> :
            <Button
              onClick={this.toggleHidden.bind(this)}
            >
              Close
            </Button>
          }
          <br />
          {!this.state.isHidden ? (
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.title}
                    name="title"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>RFP URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.rfp_url}
                    name="rfp_url"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="datetime"
                    value={this.state.deadline}
                    name="deadline"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Submitted</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="submitted"
                    checked={this.state.submitted}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Successful</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="successful"
                    checked={this.state.successful}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.purpose}
                    name="purpose"
                    onChange={this.handleChange}
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
        <Button onClick={this.toggleCopyGrantHidden}>Copy Grant</Button>
        {/* modal for grant copy confirm message */}
        <Modal show={this.state.showCopyModal} onHide={this.handleHideCopyModal}>
          <Modal.Header closeButton></Modal.Header>
          {this.state.successful_copy ? (
            <Card>
              <Card.Body>
                <Alert variant="success">
                  <Alert.Heading>Congrats! You've created a copy. View your copy 
                  <Alert.Link href={`/grants/${this.state.copied_grant_id}`}> here</Alert.Link>.
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
        {!this.state.isCopyGrantHidden ? (
        <Card.Body>
        <Form onSubmit={this.copyGrant}>
        <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="copy_title"
                value={this.state.copy_title}
                onChange={this.handleCopyChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>RFP URL</Form.Label>
              <Form.Control
                name="copy_rfp_url"
                value={this.state.copy_rfp_url}
                onChange={this.handleCopyChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                name="copy_deadline"
                value={this.state.copy_deadline}
                onChange={this.handleCopyChange}
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

          {this.state.sections.map(section => {
            return(
              <div key={section.id}>
                <SectionsUpdateFinal 
                  isUnzipped={section.isUnzipped}
                  toggleUnzipped={this.toggleUnzipped}
                  section_id={section.id}
                  boilerplates={this.state.boilerplates}
                  bios={this.state.bios}
                  // section_title={section.title}
                  // section_text={section.text}
                  // section_grant_id={this.state.id}
                  updateSections={this.updateSections}
                />
              </div>
            )
          })}
        </div>  
      </div>
    );
  }
}

export default GrantsFinalizeShow;
