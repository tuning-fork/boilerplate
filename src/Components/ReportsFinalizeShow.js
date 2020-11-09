import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import ReportSectionsShow from './ReportSectionsShow';
// import ReportsNew from './ReportsNew';
import Card from 'react-bootstrap/Card';
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

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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

  // toggleHidden() {
  //   this.setState({
  //     isHidden: !this.state.isHidden,
  //   });
  // }

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

  // handleChange(event) {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // handleSubmit(event) {
  //   const { title, text, sort_order, wordcount } = this.state;
  //   axios
  //     .patch(
  //       '/api/report_sections/' + this.state.id,
  //       {
  //         report_id: this.state.id,
  //         title: title,
  //         text: text,
  //         sort_order: sort_order,
  //         wordcount: wordcount
  //       }
  //     )
  //     .then((response) => {
  //       this.toggleHidden();
  //     })
  //     .catch((error) => {
  //       console.log('report_sections update error', error);
  //     });
  //   event.preventDefault();
  // }

  // handleSectionDelete() {
  //   axios
  //     .delete('/api/report_sections/' + this.props.section.id)
  //     .then((response) => {
  //       // if (response.data.message) {
  //       //   this.props.history.push('/sections');
  //       // }
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // updateReports = (newReport) => {
  //   const reports = this.state.reports;
  //   reports.push(newReport);
  //   this.setState({
  //     reports: reports,
  //   });
  // }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
      <Card>
        <Card.Header>
        <h3>Title: {this.state.title}</h3>
      </Card.Header>
      <Card.Body>
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
              <ReportSectionsShow id={report_section.id}/>
            </div>
          )
          })}
      </Card.Body>
      </Card>
      </div>
    );
  }
}

export default ReportsFinalizeShow;
