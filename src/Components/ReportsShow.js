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
      isGrantHidden: true,
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

  toggleHiddenGrant = () => {
    this.setState({
      isGrantHidden: !this.state.isGrantHidden,
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
    const report_sections = this.state.report_sections.map((report_section) => {
      if (report_section.id === editedReportSection.id) {
        report_section = editedReportSection
      }
      return report_section;
    })
    this.setState({
      report_sections: report_sections
    })
  }

  deleteReportSections = (deletedReportSection) => {
    // console.log("blintz", deletedReportSection);
    let report_sections = this.state.report_sections;
    let newArr = [];
    report_sections.forEach((report_section) => {
      if (report_section.id !== deletedReportSection.id) {
        newArr.push(report_section);
      }
    })
    console.log(newArr);
    this.setState({
      report_sections: newArr
    })
    // console.log("blini", this.state.report_sections)
  }

  // handleReportSectionDelete = (reportSectionId) => {
  //   // console.log(this.props.report_section_id);
  //   axios
  //     .delete('/api/report_sections/' + reportSectionId,
  //       {headers: { Authorization: `Bearer ${localStorage.token}` }})
  //     .then((response) => {
  //       this.deleteReportSections(response.data);
  //       this.toggleHidden();
  //       // console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  handleReportDelete() {
    axios
      .delete('/api/reports/' + this.state.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/grants/' + this.state.grant_id);
        }
        console.log(`report delete ${response}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    const renderedSections = this.state.grant_sections.map((grant_section) => {
      return (
      <div key={grant_section.id}>
        <h3>{grant_section.title}</h3>
        <h3 dangerouslySetInnerHTML={{__html: grant_section.text}}></h3>
        <h3>{grant_section.wordcount}</h3>
      </div> )
    })

    // console.log(this.state.report_sections);

    if (this.state.loading) {
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    }

    return (
      <div className="component container">
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

      {/* Associated grant */}

      <Button onClick={this.toggleHiddenGrant}>
        Show Associated Grant
      </Button>
      <Button onClick={this.toggleHidden.bind(this)}>
        Update Report
      </Button>

      {!this.state.isGrantHidden ? 
        <Card>
          <Card.Header>
            <h1>Associated Grant</h1>
            <h2>{this.state.grant_title}</h2>
          </Card.Header>

          <Card.Body>
            {renderedSections}
          </Card.Body>
        </Card>
      : null }

      {/* beginning of report update */}

      <div className="container">
        
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

      {/* New report section */}

      <ReportSectionsNew 
        report_id={this.state.id} 
        sort_number={this.state.report_sections.length}
        updateReportSections={this.updateReportSections}
      />
      <br />

      {/* Report sections */}

        <Card>
          <Card.Header>
            <h3>Report Sections:</h3>
          </Card.Header>
          <Card.Body>
            {this.state.report_sections.length ? this.state.report_sections.map((report_section) => {
                /* console.log("cupcake", report_section.id) */
                return (
                  <div key={report_section.id}>
                  <ReportSectionsShow
                    report_section_id={report_section.id}
                    editReportSections={this.editReportSections}
                    deleteReportSections={this.deleteReportSections}
                  />
                  {/* <Button onClick={() => this.handleReportSectionDelete(report_section.id)}>Delete</Button> */}
                  </div>
                )
            }) : <h4>There are no report sections yet.</h4>
          }
          </Card.Body>
        </Card>
        <br /> 

        <Link 
          to={`/reports-finalize/${this.state.id}`}>
          <Button>Report Finalize</Button>
        </Link> 

        <Button variant="danger" onClick={this.handleReportDelete}>
          Delete Report
        </Button>
      </div>
    );
  }
}



