import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BiosShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      title: "",
      text: "",
      organization_id: "",
      organization: "",
      wordcount: "",
      organizations: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleBioDelete = this.handleBioDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/bios/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          title: response.data.title,
          text: response.data.text,
          organization_id: response.data.organization_id,
          organization: response.data.organization,
          wordcount: response.data.wordcount,
          loading: false,
        });
      })
      // .then((response) => {
      //   this.showEditAbility();
      // })
      .catch((error) => {
        console.log(error);
      });
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
    const { first_name, last_name, title, text, organization_id } = this.state;
    axios
      .patch(
        '/api/bios/' + this.state.id,
        {
          first_name: first_name,
          last_name: last_name,
          title: title,
          text: text,
          organization_id: organization_id,
          wordcount: this.countWords(this.state.text)
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('bio update error', error);
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

  handleBioDelete() {
    axios
      .delete('/api/bios/' + this.state.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/bios');
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
        <h3>First Name: {this.state.first_name}</h3>
        <h3>Last Name: {this.state.last_name}</h3>
        </Card.Header>
        <Card.Body>
        <h3>title: {this.state.title}</h3>
        <h3>text: {this.state.text}</h3>
        <h3>organization: {this.state.organization.name}</h3>
        <h3>wordcount: {this.countWords(this.state.text)}</h3>
        </Card.Body>
      </Card>
        <br />

        <div>
            <div className="container">
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Bio
              </Button>
              <br />
              <br />
              {this.state.isHidden ? (
                  <Card>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.first_name}
                          name="first_name"
                          placeholder={this.state.first_name}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.last_name}
                          name="last_name"
                          placeholder={this.state.last_name}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
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
                        <Form.Label>Organization ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.organization_id}
                          name="organization_id"
                          placeholder={this.state.organization_id}
                          onChange={this.handleChange}
                          required
                        />
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
                  </Card>
                ) : null}
              <Button onClick={this.handleBioDelete}>Delete</Button>
            </div>
          </div>
        </div>
    );
  }
}

export default BiosShow;
