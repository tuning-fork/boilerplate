import React, { Component } from 'react';
import axios from 'axios';
import SectionsUpdateFinal from './SectionsUpdateFinal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      loading: true,
      errors: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/grants/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
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
          sections: response.data.sections,
          reports: response.data.reports,
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
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
    event.preventDefault();
  }

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
          {this.state.sections.map(section => {
            return(
              <div key={section.id}>
                <SectionsUpdateFinal 
                  section_id={section.id}
                  section_title={section.title}
                  section_text={section.text}
                  section_grant_id={this.state.id}
                  updateSections={this.updateSections}
                />
              </div>
            )
          })}
        </div>  

        {/* beginning of grant update */}
        
        <div className="container">
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
      </div>
    );
  }
}

export default GrantsFinalizeShow;
