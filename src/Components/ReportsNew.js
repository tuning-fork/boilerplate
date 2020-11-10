import React, { Component } from 'react';
import axios from 'axios';
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
      grant_id: "",
      title: "",
      deadline: "",
      submitted: "",
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

  componentDidMount() {
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      title, deadline, submitted
    } = this.state;
    axios
      .post('/api/reports', {
        grant_id: this.props.grant_id,
        title: title,
        deadline: deadline,
        submitted: submitted
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateReports(response.data);
          this.clearForm();
          this.props.toggleHiddenNewReport();
        };
      })
      .catch((error) => {
        console.log('report creation error', error);
      });
    event.preventDefault();
  }

  render() {
    console.log(this.props.sections);
    return (
      <Card>
      <Card.Header>
      <h1>New Report</h1>
      </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
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
            <Form.Group>
              <Form.Label>Submitted</Form.Label>
              <Form.Control
                name="submitted"
                value={this.state.submitted}
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
    );
  }
}

export default ReportsNew;