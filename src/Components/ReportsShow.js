import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReportSectionsNew from './ReportSectionsNew';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      report_sections: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReportDelete = this.handleReportDelete.bind(this);
    // this.showEditAbility = this.showEditAbility.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/reports/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          grant_id: response.data.grant_id,
          title: response.data.title,
          deadline: response.data.deadline,
          submitted: response.data.submitted,
          report_sections: response.data.report_sections,
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("the id is ", this.props.grand_id);
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  // showEditAbility() {
  //   if (this.state.user_id === parseInt(localStorage.user_id)) {
  //     this.setState({
  //       canEdit: !this.state.canEdit,
  //     });
  //   }
  // }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
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
        }
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
      .delete('/api/reports/' + this.state.id)
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
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
        <Card>
          <Card.Header>
          <h3>Grant ID: {this.state.grant_id}</h3>
          </Card.Header>
            <Card.Body>
              <h3>Title: {this.state.title}</h3>
              <h3>Deadline: {this.state.deadline}</h3>
              <h3>Submitted: {this.state.submitted}</h3>
            </Card.Body>
          <Card.Header>
            <h3>Report Sections:</h3>
          </Card.Header>
            <Card.Body>
              {this.state.report_sections.map(report_section => {
                  return(
                    <div key={report_section.id}>
                      <h4>{report_section.title}</h4>
                      <h4>{report_section.text}</h4>
                      <h4>{report_section.wordcount}</h4>
                    </div>
              )
        })}
            </Card.Body>
          </Card>
            <br />

        {/* beginning of report update if current user created report */}

        <div>
            <div className="container">
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Report
              </Button>
                <br />
                <br />
              {this.state.isHidden ? (
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
                        <Form.Control
                          type="text"
                          value={this.state.submitted}
                          name="submitted"
                          // placeholder={this.state.submitted}
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
        </div>

        <ReportSectionsNew 
          report_id={this.state.id} 
          history={this.props.history}
          updateReportSections={this.updateReportSections}
        />

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


