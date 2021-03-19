import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrganizationsNew from "./OrganizationsNew";
import Card from "react-bootstrap/Card";
import CurrentUser from "./CurrentUser";
import OrganizationUser from "./OrganizationUser";

class Organizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      organizations: [],
      query: "",
      // openIndex: false,
      // openNew: false,
    };
  }

  // toggleOpenIndex = () => {
  //   this.setState({
  //     openIndex: !this.state.openIndex,
  //   });
  // };

  // toggleOpenNew = () => {
  //   this.setState({
  //     openNew: !this.state.openNew,
  //   });
  // };

  componentDidMount() {
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  updateOrganizations = (newOrganization) => {
    const organizations = this.state.organizations;
    organizations.push(newOrganization);
    this.setState({
      organizations: organizations,
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
            <CurrentUser />
          </Card>
        </div>
        <div className="flex container col">
          <Card className="card-component">
            <Card.Header className="card-component card-heading">
              Organizations
            </Card.Header>
            <OrganizationsNew updateOrganizations={this.updateOrganizations} />
            <div>
              {this.state.organizations.map((organization) => {
                return (
                  <Card.Body key={organization.id}>
                    <Link to={`/organizations/${organization.id}`}>
                      {organization.name}
                    </Link>
                  </Card.Body>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Organizations;
