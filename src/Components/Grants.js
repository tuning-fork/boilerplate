import React, { Component } from 'react';
import GrantsNew from './GrantsNew';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Moment from 'react-moment';

class Grants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      grants: [],
      query: '',
    };
    this.formatFromNow = this.formatFromNow.bind(this);

  }
  componentDidMount() {
    axios
      .get('/api/grants',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          grants: response.data,
          loading: false,
        });
      console.log(response.data);
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

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="component">
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
                  <Link
                    to={{
                      pathname: `/reports-new`,
                      state: {
                        grant_id: grant.id,
                      }
                      }}
                  >
                    Create Report
                  </Link>
              </Card>
              <br />
            </div>
          );
        })}
        <h1>Add A Grant</h1>
        <GrantsNew 
          updateGrants={this.updateGrants}
        />
        
      </div>
    );
  }
}

export default Grants;
