import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BiosNew from './BiosNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class Bios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bios: [],
      organizations: [],
      query: '',
      errors: []
    };
  }
  componentDidMount() {
    axios
      .get('/api/bios',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          bios: response.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations', 
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
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
      <div className="component">
        <h1>Bios Index</h1>
        <h3>Add A Bio</h3>
        <BiosNew 
          updateBios={this.updateBios}
        />
        <br />
        {this.state.bios.map((bio) => {
          return (
            <div key={bio.id}>
              <Card>
                <Card.Header>
                  Name: <Link
                    to={`/bios/${bio.id}`}
                  >
                    {bio.first_name} {bio.last_name}
                  </Link>
                </Card.Header>
                <Card.Body>
                  <p>Title: {bio.title}</p>
                  <p>Text: {bio.text}</p>
                  <p>Organization: {bio.organization_name}</p>
                  <p>Wordcount: {bio.wordcount}</p>
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

export default Bios;