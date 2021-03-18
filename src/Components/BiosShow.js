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

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  quillChange = (value) => {
    this.setState({ quill_text: value})
  }

  handleSubmit = (event) => {
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

  countWords = (string) => { 
    if (string) {
      return (string.split(" ").length);
      } else {
        return 0; 
      }
  }

  handleBioDelete = () => {
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
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    };

    return (
      <div className="flex-container">
        <Card>
          <Card.Header style={{backgroundColor: "#09191b"}}>
          <h3 style={{color: "#23cb87", fontWeight: "bolder", display: "inline"}}>{this.state.first_name} {this.state.last_name}</h3>
          <h3 style={{color: "#fefefe", fontWeight: "bolder", display: "inline"}}> | </h3>
          <h3 style={{color: "#fefefe", fontWeight: "bolder", display: "inline"}}>{this.state.title}</h3>
          </Card.Header>
          <Card.Body>
          <h4 dangerouslySetInnerHTML={{__html: this.state.quill_text}}></h4>
          <h4>Organization: {this.state.organization.name}</h4>
          <h4>Word Count: {this.countWords(this.state.quill_text)}</h4>
          </Card.Body>
          {this.state.isHidden ?
            <Button onClick={this.toggleHidden.bind(this)} style={{maxWidth: "20%", align: "right", backgroundColor: "#23cb87", borderColor: "#fefefe", color: "#09191b", fontWeight: "bolder"}}>
              Update Bio
            </Button> :
            <Button
              onClick={this.toggleHidden.bind(this)} style={{maxWidth: "20%", align: "right", backgroundColor: "#23cb87", borderColor: "#fefefe", color: "#09191b", fontWeight: "bolder"}}
            >
              Close
            </Button>
          }
        </Card>
        <div>
          {!this.state.isHidden ? (
            <Card style={{backgroundColor: "#09191b", color: "#fefefe"}}>
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
              <ReactQuill style={{backgroundColor: "#fefefe"}}
                value={this.state.quill_text}
                onChange={this.quillChange}  
              />
              <Form.Group>
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.organization.name}
                  name="organization_id"
                  placeholder={this.state.organization.name}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Word Count</Form.Label>
                <p style={{color: "#fefefe"}}>{this.countWords(this.state.quill_text)}</p>
              </Form.Group>
              <div>
                <Button variant="outline-success" type="submit" style={{maxWidth: "20%", align: "center", backgroundColor: "#23cb87", color: "#09191b", fontWeight: "bolder"}}>
                  Save Changes
                </Button>
                <Button variant="outline-danger" style={{maxWidth: "20%", align: "center", backgroundColor: "red", color: "#09191b", fontWeight: "bolder"}} onClick={this.handleBioDelete}>Delete Bio</Button>
              </div>
            </Form>
            </Card.Body>
            </Card> 
          ) : null}
        </div>
      </div>
    );
  }
}

export default BiosShow;
