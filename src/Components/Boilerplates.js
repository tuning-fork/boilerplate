import React, { Component } from 'react';
import axios from 'axios';

class Boilerplates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      boilerplates: [],
      query: '',
    };
  }
  componentDidMount() {
    axios
      .get('/api/boilerplates')
      .then((response) => {
        this.setState({
          boilerplates: response.data,
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
        
        {this.state.boilerplates.map((boilerplate) => {
          return (
            <div className="card bg-light mb-3" key={boilerplate.id}>
              <div className="card-header">Title: {boilerplate.title}</div>
              <div className="card-body">
              <p>Text: {boilerplate.text}</p>
              <p>Organization ID: {boilerplate.organization_id}</p>
              <p>Category ID: {boilerplate.category_id}</p>
              <p>Wordcount: {boilerplate.wordcount}</p>
              </div>
              </div>
          );
        })};
      </div>
    );
  }
}

export default Boilerplates;