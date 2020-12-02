import React, { Component } from 'react';
import GrantsNew from './GrantsNew';
import FundingOrgsNew from './FundingOrgsNew'
import OrganizationsNew from './OrganizationsNew'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';

class Grants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      grants: [],
      funding_orgs: [],
      organizations: [],
      isHiddenFundingOrgsNew: true,
      isHiddenOrganizationsNew: true,
      query: '',
    };
    this.formatFromNow = this.formatFromNow.bind(this);
    this.toggleHiddenFundingOrgsNew = this.toggleHiddenFundingOrgsNew.bind(this);
    this.toggleHiddenOrganizationsNew = this.toggleHiddenOrganizationsNew.bind(this);

  }
  componentDidMount() {
    axios
      .get('/api/grants',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          grants: response.data,
        });
      // console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/funding_orgs',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          funding_orgs: response.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  }
  
  updateGrants = (newGrant) => {
		const grants = this.state.grants;
		grants.push(newGrant);
		this.setState({
			grants: grants,
		});
  };

  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDay();
    return `${month} ${day} ${year}`
  }
  
  formatFromNow(fromNowString) {
    var splitStr = fromNowString.toLowerCase().split(' ');
       for (var i = 0; i < splitStr.length; i++) {
           // You do not need to check if i is larger than splitStr length, as your for does that for you
           // Assign it back to the array
           splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
       }
       // Directly return the joined string
       return splitStr.join(' '); 
  }

  toggleHiddenFundingOrgsNew() {
    this.setState({
      isHiddenFundingOrgsNew: !this.state.isHiddenFundingOrgsNew,
    });
  }

  toggleHiddenOrganizationsNew() {
    this.setState({
      isHiddenOrganizationsNew: !this.state.isHiddenOrganizationsNew,
    });
  }

  updateFundingOrgs = (newFundingOrg) => {
		const funding_orgs = this.state.funding_orgs;
		funding_orgs.push(newFundingOrg);
		this.setState({
			funding_orgs: funding_orgs,
		});
  };
  
  updateOrganizations = (newOrganization) => {
    const organizations = this.state.organizations;
    organizations.push(newOrganization);
    this.setState({
      organizations: organizations,
    });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="component">
        <h1>Grants Index</h1>
        <h3>Add A Grant</h3>
        
            {!this.state.isHiddenFundingOrgsNew ?
              <FundingOrgsNew 
              updateFundingOrgs={this.updateFundingOrgs}
              toggleHiddenFundingOrgsNew={this.toggleHiddenFundingOrgsNew}
            /> : null
            }
        <br/>
        {!this.state.isHiddenOrganizationsNew ?
              <OrganizationsNew 
              updateOrganizations={this.updateOrganizations}
              toggleHiddenOrganizationsNew={this.toggleHiddenOrganizationsNew}
            /> : null
            }
        <br/>
        <GrantsNew 
          updateGrants={this.updateGrants}
          organizations={this.state.organizations}
          funding_orgs={this.state.funding_orgs}
          toggleHiddenOrganizationsNew={this.toggleHiddenOrganizationsNew}
          toggleHiddenFundingOrgsNew={this.toggleHiddenFundingOrgsNew}
        />
        
        {this.state.grants.map((grant) => {
          return (
            <div key={grant.id}>
              <Card>
                <Card.Header> 
                  <Link
                    to={`/grants/${grant.id}`}
                  >
                    {grant.title}
                  </Link>
                </Card.Header>
                <Card.Body>
                  <p>Purpose: {grant.purpose}</p>
                  <p>Funding Organization: {grant.funding_org_name}</p>
                  <p>RFP URL: {grant.rfp_url}</p>
                  <p>Deadline: {this.formatDate(grant.deadline)}</p>
                  <p>Deadline: <Moment>{grant.deadline}</Moment></p>
                  <Moment fromNow>{grant.deadline}</Moment>
                  <p>Submitted: {grant.submitted ? "yes" : "not yet"}</p>
                  <p>Successful: {grant.successful ? "yes" : "not yet"}</p>
                  <p>Organization Name: {grant.organization_name}</p>
                </Card.Body>
              </Card>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grants;
