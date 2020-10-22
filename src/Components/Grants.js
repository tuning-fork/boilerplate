import React, { Component } from 'react';
import GrantsNew from './GrantsNew';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Grants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      grants: [],
      query: '',
    };
  }
  componentDidMount() {
    axios
      .get('/api/grants')
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

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="container">
        
        {this.state.grants.map((grant) => {
          return (
            <div className="card bg-light mb-3" key={grant.id}>
              <div className="card-header">
                Title: 
                <Link
									to={`/grants/${grant.id}`}
								>
									{grant.title}
								</Link>
              </div>
                <div className="card-body">
                  <p>Purpose: {grant.purpose}</p>
                  <p>Funding Org ID: {grant.funding_org_id}</p>
                  <p>RFP URL: {grant.rfp_url}</p>
                  <p>Deadline: {grant.deadline}</p>
                  <p>Submitted: {grant.submitted}</p>
                  <p>Successful: {grant.successful}</p>
                  <p>Organization ID: {grant.organization_id}</p>
                  <p>Organization Name: {grant.organization_name}</p>
                </div>
            </div>
          );
        })}

        <GrantsNew 
          updateGrants={this.updateGrants}
        />
        
      </div>
    );
  }
}

export default Grants;
