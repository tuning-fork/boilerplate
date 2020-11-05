import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BoilerplatesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      text: "",
      wordcount: "",
      organization_id: "",
      category_id: "",
      organizations: [],
      categories: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleBoilerplateDelete = this.handleBoilerplateDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/boilerplates/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          text: response.data.text,
          wordcount: response.data.wordcount,
          organization_id: response.data.organization_id,
          category_id: response.data.category_id,
          loading: false,
        });
      })
      // .then((response) => {
      //   this.showEditAbility();
      // })
      .catch((error) => {
        console.log(error);
      });
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
    axios
      .get('/api/categories')
      .then((response) => {
        this.setState({
          categories: response.data,
          loading: false,
        });
      console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { title, text, organization_id, category_id } = this.state;
    axios
      .patch(
        '/api/boilerplates/' + this.state.id,
        {
          title: title,
          text: text,
          wordcount: this.countWords(this.state.text),
          organization_id: organization_id,
          category_id: category_id
        }
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('boilerplate update error', error);
      });
    event.preventDefault();
  }

  countWords(string) { 
    if (string) {
      return (string.split(" ").length);
      } else {
        return 0; 
      }
  }

  handleBoilerplateDelete() {
    axios
      .delete('/api/boilerplates/' + this.state.id)
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/boilerplates');
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="component">
      <Card>
        <Card.Header>
        <h2>title: {this.state.title}</h2>
        </Card.Header>
        <Card.Body>
        <h3>text: {this.state.text}</h3>
        <h3>organization_id: {this.state.organization_id}</h3>
        <h3>category_id: {this.state.category_id}</h3>
        <h3>wordcount: {this.countWords(this.state.text)}</h3>
        </Card.Body>
      </Card>
        <br />

        <div>
            <div className="container">
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Boilerplate
              </Button>
              <br />
              <br />
              {this.state.isHidden ? (
                <div>
                  <div>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.title}
                          name="title"
                          placeholder={this.state.title}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.text}
                          name="text"
                          placeholder={this.state.text}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                      <Form.Label>Organization</Form.Label>

                      <select name="organization_id"
                      value={this.state.organization_id}
                      onChange={this.handleChange}
                      required
                      >
                      <option value="" disabled>Select Organization</option>
                      {this.state.organizations.map(organization => {
                        return(
                          <option key={organization.id} value={organization.id} onChange={this.handleChange}>{organization.name}</option>
                          );
                      })}
                      </select>
                      </Form.Group>
                      <Form.Group>
                      <Form.Label>Category</Form.Label>

                      <select name="category_id"
                      value={this.state.category_id}
                      onChange={this.handleChange}
                      required
                      >
                      <option value="" disabled>Select Category</option>
                      {this.state.categories.map(category => {
                        return(
                          <option key={category.id} value={category.id} onChange={this.handleChange}>{category.name}</option>
                          );
                      })}
                      </select>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Word Count</Form.Label>
                        <p>{this.countWords(this.state.text)}</p>
                      </Form.Group>
                      
                      <div className="text-center">
                        <Button type="submit" className="btn-lg">
                          Submit
                        </Button>
                        <Button
                          onClick={this.toggleHidden.bind(this)}
                          className="btn-lg"
                        >
                          Close
                        </Button>
                        </div>
                    </Form>
                  </div>
                  </div>
                    ) : null} 
              </div>
              </div>
        <Button onClick={this.handleBoilerplateDelete}>Delete</Button>
      </div>
    );
  }
}

export default BoilerplatesShow;
