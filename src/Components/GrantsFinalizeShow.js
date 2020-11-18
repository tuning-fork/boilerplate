import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import SectionsShow from './SectionsShow';
// import ReportsNew from './ReportsNew';
// import ReportsShow from './ReportsShow';

// import ReportSectionsNew from './ReportSectionsNew';
import SectionsUpdateFinal from './SectionsUpdateFinal';
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

class GrantsFinalizeShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: false,
      successful: false,
      purpose: "",
      organization_id: "",
      organization_name: "",
      funding_org_id: "",
      // isHidden: true,
      // isNewReportHidden: false,
      loading: true,
      sections: [],
      reports: [],
      // organizations: [],
      funding_orgs: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.toggleHiddenNewReport = this.toggleHiddenNewReport.bind(this);
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
          organization_name: response.data.organization_name,
          funding_org_id: response.data.funding_org_id,
          sections: response.data.sections,
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

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  toggleHiddenReport() {
    this.setState({
      isReportHidden: !this.state.isReportHidden,
    });
  }

   toggleHiddenNewReport() {
    this.setState({
      isNewReportHidden: !this.state.isNewReportHidden,
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
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
          sections: [],
          organization_id: organization_id,
          funding_org_id: funding_org_id,
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        this.toggleHidden();
        this.toggleHiddenReport();
      })
      .catch((error) => {
        console.log('grant update error', error);
      });
    event.preventDefault();
  }

  handleSectionDelete() {
    axios
      .delete('/api/sections/' + this.props.section.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        // if (response.data.message) {
        //   this.props.history.push('/sections');
        // }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateReports = (newReport) => {
    const reports = this.state.reports;
    reports.push(newReport);
    this.setState({
      reports: reports,
    });
  }

  // updateSections = (newSection) => {
  //   const sections = this.state.sections;
  //   sections.push(newSection);
  //   this.setState({
  //     sections: sections
  //   }) 
  // }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">

        <h1>{this.state.title}</h1>
        <h2>{this.state.organization_name}</h2>
        <h2>{this.state.purpose}</h2>
        
              <div>
              {this.state.sections.map(section => {
                    return(
                      <div key={section.id}>
                        <SectionsUpdateFinal 
                          section_id={section.id}
                          section_title={section.title}
                          section_text={section.text}
                        />
                      </div>
                    )
                  })}
          </div>  
            
        

        {/* <Card>
          <Card.Header>
          <h3>Title: {this.state.title}</h3>
          </Card.Header>
          <Card.Body>
            <h5>RFP URL: {this.state.rfp_url}</h5>
            <h5>Deadline: {this.state.deadline}</h5>
            <h5>Submitted: {this.state.submitted ? "yes" : "not yet"}</h5>
            <h5>Successful: {this.state.successful ? "yes" : "not yet"}</h5>
            <h5>Purpose: {this.state.purpose}</h5>
          </Card.Body>
          <Card.Header>
            <h5>Sections:</h5>
          </Card.Header>
          <Card.Body>
            {this.state.sections.map(section => {
              return(
                <div key={section.id}>
                  <SectionsShow id={section.id}/>
                </div>
              )
            })}
          </Card.Body>
        </Card> */}

        {/* beginning of add reports*/}

        {/* <div>
          <div className="container">
            <Button onClick={this.toggleHiddenNewReport.bind(this)}>
              Add New Report
            </Button>
            {this.state.isNewReportHidden ? (
            <ReportsNew 
              sections={this.state.sections}
              grant_id={this.state.id}
              updateReports={this.updateReports}
              toggleHiddenNewReport={this.toggleHiddenNewReport.bind(this)}
            />
            ) : null}
          </div>
        </div> */}



        {/* beginning of show reports */}
        {/* <Button onClick={this.toggleHiddenReport.bind(this)}>
            Show Reports for This Grant
        </Button>
        {this.state.isReportHidden ? (
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
                          >
                            {report.title}
                          </Link>
                          <h4>{report.deadline}</h4>
                          <h4>{report.submitted}</h4>
                        </div>
                      </div>
                    )
                })}
              </Card.Body>
            </Card>
            <br />
          </div>
        ) : null} */}

        {/* beginning of grant update */}
        
        <br />
        <div>
            <div className="container">
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Grant
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
                        <Form.Label>RFP URL</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.rfp_url}
                          name="rfp_url"
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
                      <Form.Group>
                        <Form.Label>Successful</Form.Label>
                        <Form.Check
                          type="checkbox"
                          name="successful"
                          checked={this.state.successful}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Purpose</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.purpose}
                          name="purpose"
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
                  </div>
                </div>
                ) : null}
            </div>
        </div>
      </div>
    );
  }
}

export default GrantsFinalizeShow;
