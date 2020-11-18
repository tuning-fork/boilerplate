import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class BiosShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      quill_text: "",
      first_name: "",
      last_name: "",
      title: "",
      organization_id: "",
      organization: "",
      wordcount: "",
      organizations: [],
      isHidden: true,
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleBioDelete = this.handleBioDelete.bind(this);
    this.quillChange = this.quillChange.bind(this);
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
          quill_text: response.data.text,
          organization_id: response.data.organization_id,
          organization: response.data.organization,
          wordcount: response.data.wordcount,
          loading: false,
        });
      })
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

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  handleSubmit(event) {
    const { first_name, last_name, title, quill_text, organization_id } = this.state;
    axios
      .patch(
        '/api/bios/' + this.state.id,
        {
          first_name: first_name,
          last_name: last_name,
          title: title,
          text: quill_text,
          organization_id: organization_id,
          wordcount: this.countWords(this.state.quill_text)
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
          <h3>{this.state.first_name} {this.state.last_name}</h3>
          </Card.Header>
          <Card.Body>
          <h3>{this.state.title}</h3>
          <h4>{this.state.quill_text}</h4>
          <h4>Organization: {this.state.organization.name}</h4>
          <h4>wordcount: {this.countWords(this.state.quill_text)}</h4>
          </Card.Body>
        </Card>
        <br />

        <div className="container">
          {this.state.isHidden ?
            <Button onClick={this.toggleHidden.bind(this)}>
              Update Bio
            </Button> :
            <Button
              onClick={this.toggleHidden.bind(this)}
            >
              Close
            </Button>
          }
          <br />
          <br />
          {!this.state.isHidden ? (
            <Card>
            <Card.Body>
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
              <ReactQuill 
                value={this.state.quill_text}
                onChange={this.quillChange}  
              />
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
                <p>{this.countWords(this.state.quill_text)}</p>
              </Form.Group>
              <div className="text-center">
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </Form>
            </Card.Body>
            </Card> 
          ) : null}
          <br />
          <Button variant="danger" onClick={this.handleBioDelete}>Delete</Button>
        </div>
      </div>
    );
  }
}

export default BiosShow;
