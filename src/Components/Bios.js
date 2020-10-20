import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BiosNew from './BiosNew';
import axios from 'axios';

class Bios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bios: [],
      organizations: [],
      query: '',
    };
  }
  componentDidMount() {
    axios
      .get('/api/bios')
      .then((response) => {
        this.setState({
          bios: response.data,
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

  updateBios = (newBio) => {
    const bios = this.state.bios;
    bios.push(newBio);
    this.setState({
      bios: bios,
    });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="container">
        
        {this.state.bios.map((bio) => {
          return (
            <div className="card bg-light mb-3" key={bio.id}>
              <div className="card-header">
              Name: 
              <Link
                  to={`/bios/${bio.id}`}
                >
                  {bio.first_name} {bio.last_name}
                </Link>
              </div>
              <div className="card-body">
              <p>Title: {bio.title}</p>
              <p>Text: {bio.text}</p>
              <p>Organization: {bio.organization_id}</p>
              <p>Wordcount: {bio.wordcount}</p>
              </div>
              </div>
          );
        })}
        <br />
        <h3>Add Bio</h3>
        <BiosNew 
          updateBios={this.updateBios}
        />
      </div>
    );
  }
}

export default Bios;