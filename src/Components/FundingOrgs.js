import React, { Component } from 'react';
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
  }

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
        })};
      </div>
    );
  }
}

export default FundingOrgs;