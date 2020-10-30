import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import FundingOrgsNew from './FundingOrgsNew';
import axios from 'axios';

class FundingOrgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      funding_orgs: [],
      query: '',
      waffle: "waffle"
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
      // console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations')
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
      // console.log(response.data);
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
      <div className="component">
        
        {this.state.funding_orgs.map((funding_org) => {
          return (
            <div className="card bg-light mb-3" key={funding_org.id}>
              <div className="card-header">
              Name: 
              <Link
                  to={`/funding_orgs/${funding_org.id}`}
                >
                  {funding_org.name}
                </Link>
              </div>
            </div>
          );
        })}
        <br />
        <h3>Add Funding Org</h3>
        <FundingOrgsNew 
          updateFundingOrgs={this.updateFundingOrgs} waffle={this.state.waffle}
        />
      </div>
    );
  }
}

export default FundingOrgs;