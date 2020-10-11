import React, { Component } from 'react';
import axios from 'axios';

class Bios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      bios: [],
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
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="container">
        
        {this.state.bios.map((bio) => {
          return (
            <div className="card bg-light mb-3" key={bio.id}>
              <div className="card-header">Name: {bio.first_name} {bio.last_name}</div>
              <div className="card-body">
              <p>Title: {bio.Title}</p>
              <p>Text: {bio.text}</p>
              <p>Organization ID: {bio.organization_id}</p>
              <p>Wordcount: {bio.wordcount}</p>
              </div>
              </div>
          );
        })};
      </div>
    );
  }
}

export default Bios;