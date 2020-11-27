import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import ReportSectionsShow from './ReportSectionsShow';
import ReportSectionsUpdateFinal from './ReportSectionsUpdateFinal';
// // import ReportsNew from './ReportsNew';
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ReportsFinalizeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      deadline: "",
      submitted: "",
      // isHidden: true,
      report_sections: [],
      loading: true,
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateReportSections = this.updateReportSections.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/reports/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
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

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  // toggleHiddenReport() {
  //   this.setState({
  //     isReportHidden: !this.state.isReportHidden,
  //   });
  // }

  //  toggleHiddenNewReport() {
  //   this.setState({
  //     isNewReportHidden: !this.state.isNewReportHidden,
  //   });
  // }

  // showEditAbility() {
  //   if (this.state.user_id === parseInt(localStorage.user_id)) {
  //     this.setState({
  //       canEdit: !this.state.canEdit,
  //     });
  //   }
  // }

  updateReportSections = (newReportSection) => {
    let report_sections = this.state.report_sections.map(report_section => {
      if (report_section.id === newReportSection.id) {
        report_section.title = newReportSection.title
        report_section.text = newReportSection.text
        report_section.wordcount = newReportSection.wordcount
      }
      return report_section
    });
    this.setState({
      report_sections: report_sections
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

  handleSubmit(event) {
    const { title, deadline, submitted } = this.state;
    axios
      .patch(
        '/api/reports/' + this.state.id,
        {
          title: title,
          deadline: deadline,
          submitted: submitted,
          report_sections: []
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

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
        <h1>Report Finalize - View and Finalize Report Draft</h1>
        <div>
        <h5>{this.state.title}</h5>
      </div>
      <div>
        <h5>{this.state.deadline}</h5>
        <h5>{this.state.submitted}</h5>
      </div>
      <div>
        {this.state.report_sections.map(report_section => {
          return(
            <div key={report_section.id}>
              <ReportSectionsUpdateFinal 
              report_section_id={report_section.id}
              report_section_title={report_section.title}
              report_section_text={report_section.text}
              updateReportSections={this.updateReportSections}
              />
            </div>
          )
          })}
      </div>
        <div>
          <div className="container">
            <Button onClick={this.toggleHidden.bind(this)}>
              Update Report
            </Button>
            <br />
            <br />
            {this.state.isHidden ? (
              <div>
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
                </div>
                </div>
                ) : null}
            </div>
        </div>

      </div>


    );
  }
}

export default ReportsFinalizeShow;
