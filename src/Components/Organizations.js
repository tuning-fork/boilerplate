import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Organizations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      organizations: [],
      query: '',
    };
  }
  componentDidMount() {
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

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="component">
        
        {this.state.organizations.map((organization) => {
          return (
            <div className="card bg-light mb-3" key={organization.id}>
              <div className="card-header">
              Name: 
              <Link
                  to={`/organizations/${organization.id}`}
                >
                  {organization.name}
                </Link>
              </div>
              </div>
          );
        })}
      </div>
    );
  }
}

export default Organizations;