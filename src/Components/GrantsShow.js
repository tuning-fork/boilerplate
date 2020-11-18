import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SectionsNew from './SectionsNew';
import ReportsNew from './ReportsNew';
import SectionsShow from './SectionsShow';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class GrantsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: "",
      successful: "",
      purpose: "",
      organization_id: "",
      funding_org_id: "",
      isHidden: true,
      sections: [],
      reports: [],
      organizations: [],
      funding_orgs: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGrantDelete = this.handleGrantDelete.bind(this);
    this.updateReports = this.updateReports.bind(this);
    this.updateSections = this.updateSections.bind(this);
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
    const { name, value } = event.target;
    this.setState({
      [name]: value,
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

  updateSections = (newSection) => {
    const sections = this.state.sections;
    sections.push(newSection);
    this.setState({
      sections: sections
    }) 
  }

  updateReports = (newReport) => {
    const reports = this.state.reports;
    reports.push(newReport);
    this.setState({
      reports: reports
    }) 
  }

  handleGrantDelete() {
		axios
			.delete('/api/grants/' + this.state.id, 
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
			.then((response) => {
        if (response.data.message) {
					this.props.history.push('/grants');
				}
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
  }
  

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
        <Card>
          <Card.Header>
            <h2>{this.state.title}</h2>
          </Card.Header>
          <Card.Body>
            <h3>Purpose: {this.state.purpose}</h3>
            <h3>RFP URL: {this.state.rfp_url}</h3>
            <h3>Deadline: {this.state.deadline}</h3>
            <h3>Submitted: {this.state.submitted ? "yes" : "not yet"}</h3>
            <h3>Successful: {this.state.successful ? "yes" : "not yet"}</h3>

            {/* beginning of grant update */}

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
                <div>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.title}
                        name="title"
                        // placeholder={this.state.title}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Purpose</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.purpose}
                        name="purpose"
                        // placeholder={this.state.purpose}
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
                        // placeholder={this.state.rfp_url}
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
                        // placeholder={this.state.deadline}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Submitted</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.submitted}
                        name="submitted"
                        // placeholder={this.state.submitted}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Successful</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.successful}
                        name="successful"
                        // placeholder={this.state.successful}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <div className="text-center">
                      <Button type="submit" >
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            ) : null}
          </Card.Body>

          {/* end of grant update, beginning of sections and reports */}

          <Card.Header>
            <h2>Sections:</h2>
          </Card.Header>
          <Card.Body>
            {this.state.sections.length ? this.state.sections.map(section => {
                return(
                  <div key={section.id}>
                    <SectionsShow 
                      section_id={section.id}
                      section_title={section.title}
                      section_text={section.text}
                      section_wordcount={section.wordcount}
                      section_sort_order={section.sort_order}
                      section_grant_id={section.grant_id}
                      updateSections={this.updateSections}
                    />
                  </div>
                )
              }) : <h4>There are no sections yet.</h4>
            }
            <SectionsNew 
              sort_number={this.state.sections.length}
              grant_id={this.state.id} 
              updateSections={this.updateSections}
            />
          </Card.Body>
        
          {/* reports */}

          <Card.Header>
            <h2>Reports:</h2>
          </Card.Header>
          <Card.Body>
            {this.state.reports.length ? this.state.reports.map(report =>
              {
                return(
                  <div key={report.id}>
                    <Link 
                     to={`/reports/${report.id}`}
                    >
                      <h4>{report.title}</h4>
                    </Link>
                    <h4>{report.deadline}</h4>
                    <h4>{report.submitted}</h4>
                  </div>
                  )
              }) : <h4>There are no reports yet.</h4>
            }
            <ReportsNew 
              sort_number={this.state.sections.length}
              grant_id={this.state.id} 
              grant_title={this.state.title} 
              updateReports={this.updateReports}
            />
          </Card.Body>
        </Card>
        <br />
        <Button variant="danger" onClick={this.handleGrantDelete}>Delete Grant</Button>
        <Link 
          to={`/grants-finalize/${this.state.id}`}
        >
          <Button>Grant Finalize</Button>
        </Link>
      </div>
    );
  }
}

export default GrantsShow;
