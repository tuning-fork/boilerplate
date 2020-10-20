import React, { Component } from 'react';
import FundingOrgsNew from './FundingOrgsNew';
import axios from 'axios';

class FundingOrgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      funding_orgs: [],
      query: '',
    };
  }
  componentDidMount() {
    axios
      .get('/api/funding_orgs')
      .then((response) => {
        this.setState({
          funding_orgs: response.data,
          loading: false,
        });
      console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations')
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
      console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  updateFundingOrgs = (newFundingOrg) => {
		const funding_orgs = this.state.funding_orgs;
		funding_orgs.push(newFundingOrg);
		this.setState({
			funding_orgs: funding_orgs,
		});
	};

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="container">
        
        {this.state.funding_orgs.map((funding_org) => {
          return (
            <div className="card bg-light mb-3" key={funding_org.id}>
              <div className="card-header">Name: {funding_org.name}</div>
            </div>
          );
        })}
        <br />
        <h3>Add Funding Org</h3>
        <FundingOrgsNew 
          updateFundingOrgs={this.updateFundingOrgs}
        />

      </div>
    );
  }
}

export default FundingOrgs;