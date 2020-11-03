import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BoilerplatesNew from './BoilerplatesNew';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

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

  updateBoilerplates = (newBoilerplate) => {
    const boilerplates = this.state.boilerplates;
    boilerplates.push(newBoilerplate);
    this.setState({
      boilerplates: boilerplates,
    });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    };

    return (
      <div className="component">
        
        {this.state.boilerplates.map((boilerplate) => {
          return (
            <Card key={boilerplate.id}>
              <Card.Header>
              Title: 
              <Link
                  to={`/boilerplates/${boilerplate.id}`}
                >
                  {boilerplate.title}
                </Link>
              </Card.Header>
              <Card.Body>
              <p>Text: {boilerplate.text}</p>
              <p>Organization ID: {boilerplate.organization_id}</p>
              <p>Category ID: {boilerplate.category_id}</p>
              <p>Wordcount: {boilerplate.wordcount}</p>
              </Card.Body>
              </Card>
          );
        })}
        <br />
        <h3>Add Boilerplate</h3>
        <BoilerplatesNew 
          updateBoilerplates={this.updateBoilerplates}
        />
      </div>
    );
  }
}

export default Boilerplates;