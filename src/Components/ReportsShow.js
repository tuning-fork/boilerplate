import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReportSectionsNew from './ReportSectionsNew';
import ReportSectionsShow from './ReportSectionsShow';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        // console.log(response.data);
        this.setState({
          id: response.data.id,
          grant_id: response.data.grant_id,
          title: response.data.title,
          deadline: response.data.deadline,
          submitted: response.data.submitted,
          report_sections: response.data.report_sections,
          grant_sections: response.data.grant_sections,
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
    const report_sections = this.state.report_sections;
    report_sections.push(newReportSection);
    this.setState({
      report_sections: report_sections,
    })
  }

  // updateNewReports = (newReport) => {
  //   const reports = this.state.reports;
  //   reports.push(newReport);
  //   this.setState({
  //     reports: reports
  //   }) 
  // }

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
    // console.log(this.state.grant_sections);
    // console.log(this.state.report_sections);
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
                    // placeholder={this.state.deadline}
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
            {this.state.report_sections.length ? this.state.report_sections.map(report_section => {
                return(
                  <div key={report_section.id}>
                  <ReportSectionsShow
                  report_section_id={report_section.id}
                  // report_section_title={report_section.title}
                  // report_section_text={report_section.text}
                  // report_section_wordcount={report_section.wordcount}
                  // report_section_report_id={report_section.report_id}
                  updateReportSections={this.updateReportSections}
                  />
                  </div>
                )
            }) : <h4>There are no report sections yet.</h4>
          }
          </Card.Body>
        </Card>
        <br />  

          {/* ReportSectionsShow and ReportSectionsNew  */}

        {/* <div>
          {this.state.grant_sections.map(grant_section => {
            return(
              <div key={grant_section.section.id}>
                <Container>
                  <Row style={{paddingBottom: "5%"}}>
                    <Col key={grant_section.id}>
                      <h5>{grant_section.section.title}</h5>
                      <h5 dangerouslySetInnerHTML={{__html: grant_section.section.text}}></h5>
                      <h5>Sort Order: {grant_section.section.sort_order}</h5>
                    </Col>
                    <Col key={grant_section.id}>
                    {grant_section.grant_section_match ? 
                      (
                        <div key={grant_section.grant_section_match.id}>
                          <ReportSectionsShow
                          report_section_id={grant_section.grant_section_match.id}
                          report_section_title={grant_section.grant_section_match.title}
                          report_section_text={grant_section.grant_section_match.text}
                          report_section_wordcount={grant_section.grant_section_match.wordcount}
                          report_section_report_id={grant_section.grant_section_match.report_id}
                          updateReportSections={this.updateReportSections}
                          />
                        </div>
                      )
                    :
                      <div>
                        <ReportSectionsNew 
                        report_id={this.state.id} 
                        grant_section_number={grant_section.section.sort_order}
                        updateReportSections={this.updateReportSections}
                        />
                      </div>
                    }
                    </Col>
                  </Row>
                </Container>
              </div>
            )
          })}
        </div> */}

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



