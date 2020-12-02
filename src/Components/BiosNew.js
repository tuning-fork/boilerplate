import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class BiosNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill_text: "",
      first_name: "",
      last_name: "",
      title: "",
      text: "",
      organization_id: "",
      wordcount: "",
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      quill_text: "",
      first_name: "",
      last_name: "",
      title: "",
      text: "",
      organization_id: "",
      wordcount: ""
    });
  };

  // componentDidMount() {
    
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  handleSubmit(event) {
    const {
      first_name, last_name, title, quill_text, organization_id
    } = this.state;
    axios
      .post('/api/bios', {
        first_name: first_name,
        last_name: last_name,
        title: title,
        text: quill_text,
        organization_id: organization_id,
        wordcount: this.countWords(this.state.quill_text)
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateBios(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('bio creation error', error);
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

  render() {
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control
                as="select" 
                name="organization_id"
                value={this.state.organization_id}
                onChange={this.handleChange}
                required
              >
                <option value="" disabled>Select Organization</option>
                {this.props.organizations.map(organization => {
                  return(
                    <option 
                      key={organization.id} 
                      value={organization.id} 
                      onChange={this.handleChange}
                    >
                      {organization.name}
                    </option>
                  );
                })}
              </Form.Control>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={this.props.toggleHiddenOrganizationsNew}>Add Organization
              </Button>
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Label>Bio Text</Form.Label>
            <ReactQuill 
              // name="quill_text"
              value={this.state.quill_text}
              onChange={this.quillChange}  
            />
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{this.countWords(this.state.quill_text)}</p>
            </Form.Group>
            <div className="text-center">
              <Button type="submit">
                Add New Bio
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default BiosNew;