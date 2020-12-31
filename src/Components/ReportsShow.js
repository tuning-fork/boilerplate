import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReportSectionsNew from './ReportSectionsNew';
import ReportSectionsShow from './ReportSectionsShow';
// import GrantsShow from './GrantsShow';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default class ReportsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      grant_id: "",
      title: "",
      deadline: "",
      submitted: "",
      isHidden: true,
      grant_title: "",
      grant_sections: [],
      report_sections: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReportDelete = this.handleReportDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/reports/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          grant_id: response.data.grant_id,
          title: response.data.title,
          deadline: response.data.deadline,
          submitted: response.data.submitted,
          report_sections: response.data.report_sections,
          grant_sections: response.data.grant.grant_sections,
          loading: false
        })
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

  toggleHiddenNewReportSection() {
    this.setState({
      isHiddenNewReportSection: !this.state.isHiddenNewReportSection,
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
    const { grant_id, title, deadline, submitted } = this.state;
    axios
      .patch(
        '/api/reports/' + this.state.id,
        {
          grant_id: grant_id,
          title: title,
          deadline: deadline,
          submitted: submitted
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('report update error', error);
      });
    event.preventDefault();
  }

  updateReportSections = (newReportSection) => {
    let report_sections = this.state.report_sections;
    report_sections.push(newReportSection);
    this.setState({
      report_sections: report_sections
    })
    console.log(newReportSection);
    console.log(this.state.report_sections)
  }

  editReportSections = (editedReportSection) => {
    console.log(editedReportSection)
    let report_sections = this.state.report_sections;
    report_sections = report_sections.map((report_section) => {
      if (report_section.id === editedReportSection.id) {
        report_section = editedReportSection
      }
    })
    this.setState({
      report_sections: report_sections
    })
  }

  handleReportDelete() {
    axios
      .delete('/api/reports/' + this.state.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/grants/' + this.state.grant_id);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    const renderedSections = this.state.grant_sections.map((grant_section) => {
      return (
      <div>
        <h3>{grant_section.title}</h3>
        <h3>{grant_section.text}</h3>
        <h3>{grant_section.wordcount}</h3>
      </div> )
    })

    console.log(this.state.grant_sections)

    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
      <h1>Report Show - Build Draft Report Sections</h1>
      <Card>
          <Card.Header>
            <h2>{this.state.title}</h2>
          </Card.Header>
          <Card.Body>
            <h3>Deadline: {this.state.deadline}</h3>
            <h3>Submitted: {this.state.submitted ? "yes" : "not yet"}</h3>
          </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h2>{this.state.grant_title}</h2>
        </Card.Header>

        <Card.Body>
          {renderedSections}
        </Card.Body>
      </Card>

      {/* beginning of report update */}
      <div className="container">
        <Button onClick={this.toggleHidden.bind(this)}>
          Update Report
        </Button>
        <br />
        <br />
        {!this.state.isHidden ? (
          <Card>
            <Card.Body>
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
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button type="submit" className="btn-lg">
                    Submit
                  </Button>
                  <Button
                    onClick={this.toggleHidden.bind(this)}
                    className="btn-lg"
                  >
                    Close
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : null }
      </div>

      <br/>
      <br/>

        <Card>
          <Card.Header>
            <h3>Report Sections:</h3>
          </Card.Header>
          <Card.Body>
            <div>
              <ReportSectionsNew 
              report_id={this.state.id} 
              sort_number={this.state.report_sections.length}
              updateReportSections={this.updateReportSections}
              />
            </div>
            {this.state.report_sections.length ? this.state.report_sections.map((report_section, id) => {
                return(
                  <React.Fragment key={id}>
                    <ReportSectionsShow
                    report_section_id={id}
                    // updateReportSections={this.updateReportSections}
                    editReportSections={this.editReportSections}
                    />
                  </React.Fragment>
                )
            }) : <h4>There are no report sections yet.</h4>
          }
          </Card.Body>
        </Card>
        <br />  

        <Button variant="danger" onClick={this.handleReportDelete}>
          Delete
        </Button>

        <Link 
          to={`/reports-finalize/${this.state.id}`}>
          <Button>Report Finalize</Button>
        </Link>
      </div>
    );
  }
}



