import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SectionsNew from './SectionsNew';

class GrantsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      rfp_url: "",
      deadline: "",
      submitted: "",
      successful: "",
      purpose: "",
      organization_id: "",
      funding_org_id: "",
      isHidden: true,
      sections: [],
      reports: [],
      organizations: [],
      funding_orgs: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGrantDelete = this.handleGrantDelete.bind(this);
    // this.showEditAbility = this.showEditAbility.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/grants/${this.props.match.params.id}`)
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

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log("the id is ", this.props.grand_id);
  // }

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
          organization_id: organization_id,
          funding_org_id: funding_org_id,
        }
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('grant update error', error);
      });
    event.preventDefault();
  }

  updateSections = (newSection) => {
    const sections = this.state.sections;
    sections.push(newSection);
    this.setState({
      sections: sections
    }) 
  }

  handleGrantDelete() {
		axios
			.delete('/api/grants/' + this.state.id)
			.then((response) => {
        if (response.data.message) {
					this.props.history.push('/grants');
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
      <div className="container">
        <h3>Title: {this.state.title}</h3>
        <h3>RFP URL: {this.state.rfp_url}</h3>
        <h3>Deadline: {this.state.deadline}</h3>
        <h3>Submitted: {this.state.submitted}</h3>
        <h3>Successful: {this.state.successful}</h3>
        <h3>Purpose: {this.state.purpose}</h3>
        <h3>Sections:</h3>
        {this.state.sections.map(section => {
            return(
              <div key={section.id}>
                <h4>{section.title}</h4>
                <h4>{section.text}</h4>
                <h4>{section.wordcount}</h4>
              </div>
              )
        })}
        <h3>Reports:</h3>
        {this.state.reports.map(report =>
          {
            return(
              <div key={report.id}>
                <h4>{report.title}</h4>
                <h4>{report.deadline}</h4>
                <h4>{report.submitted}</h4>
              </div>
              )
          })}
        <br />

        {/* beginning of grant update if current user created grant */}

        <div>
            <div className="container">
              <button onClick={this.toggleHidden.bind(this)}>
                Update Grant
              </button>
              <br />
              <br />
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={this.state.title}
                          name="title"
                          // placeholder={this.state.title}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>RFP URL</label>
                        <input
                          type="text"
                          value={this.state.rfp_url}
                          name="rfp_url"
                          // placeholder={this.state.rfp_url}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Deadline</label>
                        <input
                          type="datetime"
                          value={this.state.deadline}
                          name="deadline"
                          // placeholder={this.state.deadline}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Submitted</label>
                        <input
                          type="text"
                          value={this.state.submitted}
                          name="submitted"
                          // placeholder={this.state.submitted}
                          onChange={this.handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Successful</label>
                        <input
                          type="text"
                          value={this.state.successful}
                          name="successful"
                          // placeholder={this.state.successful}
                          onChange={this.handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Purpose</label>
                        <input
                          type="text"
                          value={this.state.purpose}
                          name="purpose"
                          // placeholder={this.state.purpose}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      
                      <div className="text-center">
                        <button type="submit" className="btn-lg">
                          Submit
                        </button>
                        <button
                          onClick={this.toggleHidden.bind(this)}
                          className="btn-lg"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        </div>

        <SectionsNew 
          grant_id={this.state.id} 
          history={this.props.history}
          updateSections={this.updateSections}
        />

        <button onClick={this.handleGrantDelete}>Delete</button>
        <Link 
          to={`/grants-finalize/${this.state.id}`}
        >
          Grant Finalize
        </Link>

      </div>
    );
  }
}

export default GrantsShow;
