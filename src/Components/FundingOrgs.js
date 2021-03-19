import React, { Component } from "react";
import { Link } from "react-router-dom";
import FundingOrgsNew from "./FundingOrgsNew";
import axios from "axios";
import Card from "react-bootstrap/Card";

class FundingOrgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // openIndex: false,
      // openNew: false
    };
  }

  // toggleOpenIndex = () => {
  //   this.setState({
  //     openIndex: !this.state.openIndex,
  //   });
  // }

  // toggleOpenNew = () => {
  //   this.setState({
  //     openNew: !this.state.openNew,
  //   });
  // }

  componentDidMount() {
    axios
      .get("/api/funding_orgs", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        this.setState({
          funding_orgs: response.data,
          loading: false,
        });
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
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
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    }

    return (
      <div className="flex-container">
        <div className="flex container col">
          <Card className="card-component">
            <Card.Header className="card-component card-heading">
              Funding Orgs
            </Card.Header>
            {this.state.funding_orgs.map((funding_org) => {
              return (
                <Card.Body key={funding_org.id}>
                  <Link to={`/funding_orgs/${funding_org.id}`}>
                    {funding_org.name}
                  </Link>
                </Card.Body>
              );
            })}
          </Card>
        </div>
        <div className="flex container col">
          <FundingOrgsNew updateFundingOrgs={this.updateFundingOrgs} />
        </div>
      </div>
    );
  }
}

export default FundingOrgs;
