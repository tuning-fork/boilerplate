import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import ReportSectionsNew from './ReportSectionsNew';
// import SectionsShow from './SectionsShow';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

class ReportsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // grant_id: "",
      title: "",
      deadline: "",
      submitted: false,
      grant_id: "",
      grant_title: "",
      reports: [],
      loading: true,
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      title: "",
      deadline: "",
      submitted: ""
    });
  };

  // componentDidMount() {
    // axios
    //   .get('/api/organizations')
    //   .then((response) => {
    //     this.setState({
    //       organizations: response.data,
    //       loading: false,
    //     });
    //   // console.log(response.data);
    //   })
    //   .catch((error) => console.log(error));
    // axios
    //   .get('/api/funding_orgs')
    //   .then((response) => {
    //     this.setState({
    //       funding_orgs: response.data,
    //       loading: false,
    //     });
    //   // console.log(response.data);
    //   })
    //   .catch((error) => console.log(error));
  // }

  componentDidMount() {
    axios
      .get(`/api/grants/${this.props.location.state.grant_id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          grant_id: response.data.id,
          grant_title: response.data.title,
          reports: response.data.reports,
          loading: false,
        });
      })
      // .then((response) => {
      //   this.showEditAbility();
      // })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      deadline, submitted
    } = this.state;
    axios
      .post('/api/reports', {
        grant_id: this.state.grant_id,
        title: `Report for ${this.state.grant_title}`,
        deadline: deadline,
        submitted: submitted
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.state.reports.push(response.data);
          this.clearForm();
          // this.props.toggleHiddenNewReport();
        };
      })
      .catch((error) => {
        console.log('report creation error', error);
      });
    event.preventDefault();
  }


  render() {
    // console.log(this.props.sections);
    // console.log(this.props.location.state);
    return (
      <div className="component">
        <Card>
        <Card.Header>
        <h1>New Report for {this.state.grant_title}</h1>
        </Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={`Report for ${this.state.grant_title}`}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="deadline"
                  value={this.state.deadline}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <div className="text-center">
                <Button type="submit">
                  Submit New Report
                </Button>
              </div>
            </Form>
          </Card.Body>
          {/* <Container>
                {this.props.sections.map(section => {
                  return(
                    <div key={section.id}>
                      <Row>
                        <Col>
                          <SectionsShow id={section.id}/>
                        </Col>
                        <Col>
                          <ReportSectionsNew 
                          />
                        </Col>
                      </Row>
                    </div>
                  )
                })}
          </Container> */}
        </Card>

        {/* beginning of show reports */}
        {/* <Button onClick={this.toggleHiddenReport.bind(this)}>
            Show Reports for This Grant
        </Button>
        {this.state.isReportHidden ? ( */}
          <div>
        <Card>
        <Card.Header>
        <h3>Reports:</h3>
        </Card.Header>
        <Card.Body>
          {this.state.reports.map(report =>
            {
              return(
                <div key={report.id}>
                  <div>
                    Title: 
                    <Link
                      to={`/reports/${report.id}`}
                    > {report.title}
                    </Link>
                    <h5>Deadline: {report.deadline}</h5>
                    <h5>Submitted: {report.submitted ? "yes" : "not yet"}</h5>
                    <h5>Created: {report.created_at}</h5>
                  </div>
                  <br />
                </div>
              )
            })}
            </Card.Body>
          </Card>
          <br />
        </div>
        {/* ) : null} */}
      </div>
    );
  }
}

export default ReportsNew;