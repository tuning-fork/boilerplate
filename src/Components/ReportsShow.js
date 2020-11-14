import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReportSectionsNew from './ReportSectionsNew';
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
        this.setState({
          id: response.data.id,
          grant_id: response.data.grant_id,
          title: response.data.title,
          deadline: response.data.deadline,
          submitted: response.data.submitted,
          report_sections: response.data.report_sections,
        })
        return axios.get(`/api/grants/${this.state.grant_id}`, 
          {headers: { Authorization: `Bearer ${localStorage.token}` }})
          .then((response => {
            this.setState({
              grant_title: response.data.title,
              grant_sections: response.data.sections,
              loading: false,
              });
          }))
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
    console.log(this.state.grant_sections);
    console.log(this.state.report_sections);
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
        <Card>
          <Card.Header>
            <h3>Report Sections:</h3>
          </Card.Header>
          <Card.Body>
            {this.state.report_sections.map(report_section => {
                return(
                  <div key={report_section.id}>
                    <h4>{report_section.title}</h4>
                    <h4>{report_section.text}</h4>
                    <h4>Wordcount: {report_section.wordcount}</h4>
                  </div>
                )
            })}
          </Card.Body>
        </Card>
        <br />

            {/* beginning of report update if current user created report */}

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
                      // placeholder={this.state.title}
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
        

        <div>
          {this.state.grant_sections.map(section => {
            return(
              <div key={section.id}>
                <Container>
                  <Row style={{paddingBottom: "5%"}}>
                    <Col>
                      <h5>{section.title}</h5>
                      <h5>{section.text}</h5>
                    </Col>
                    {/* <div>
                      {this.state.report_sections.filter(function(report_section) {
                          return <h5>{report_section.sort_order === section.sort_order}</h5>
                      })}
                    </div> */}
                    <Col>
                      <ReportSectionsNew 
                      report_id={this.state.id} 
                      grant_section_number={section.sort_order}
                      updateReportSections={this.updateReportSections}
                      />
                    </Col>
                  </Row>
                </Container>
                {this.state.report_sections.length ? <h5>There are report sections!</h5> : <h5>There are no report sections :(</h5>}
              </div>
            )
          })}
        </div>

        {/* <div>
          {this.state.report_sections.map(report_section => {
            return(
              <div key={report_section.id}>
                <Container>
                  <Row style={{paddingBottom: "5%"}}>
                    <Col>
                      <h5>{report_section.title}</h5>
                      <h5>{report_section.text}</h5>
                    </Col>
                  </Row>
                </Container>
                {this.state.report_sections.length ? <h5>There are report sections!</h5> : <h5>There are no report sections :(</h5>}
              </div>
            )
          })}
        </div> */}

        <Button onClick={this.handleReportDelete}>
          Delete
        </Button>

        <Link 
          to={`/reports-finalize/${this.state.id}`}>
          Report Finalize
        </Link>
      </div>
    );
  }
}

// {this.state.report_sections.map(report_section => {
// //                           if (report_section.sort_order === section.sort_order) {
// //                             return(
// //                             <Col>
// //                             <h5>{report_section.title}</h5>
// //                             <h5>{report_section.text}</h5>
// //                             </Col>
// //                           )
// //                           }
// //                           else {
// //                             return(
// //                             <Col>
// //                             <ReportSectionsNew 
// //                               report_id={this.state.id} 
// //                               grant_section_number={section.sort_order}
// //                               updateReportSections={this.updateReportSections}
// //                             />
// //                             </Col>
// //                           )
// //                           }
// //                         })
// //                         }


