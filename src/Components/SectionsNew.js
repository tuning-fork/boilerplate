import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class SectionsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill_text: '',
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      boilerplates: [],
      currentBoilerplate: '',
      // addText: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      quill_text: "",
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      currentBoilerplate: '',
      // addText: ''
    });
  };

  componentDidMount() {
    axios
      .get('/api/boilerplates',
        {headers: { Authorization: `Bearer ${localStorage.token}` }}) 
      .then((response) => {
        this.setState({
          boilerplates: response.data
        }); 
      })
  }

  handleSubmit(event) {
    const {
      title, quill_text, sort_order
    } = this.state;
    axios
      .post('/api/sections', {
        grant_id: this.props.grant_id,
        title: title,
        text: quill_text,
        sort_order: sort_order,
        wordcount: this.countWords(this.state.quill_text)
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateSections(response.data);
          this.clearForm();
        }
      })
      .catch((error) => {
        console.log('section creation error', error);
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  handleSelect = (event) => {
    let quill_text = this.state.quill_text;
    quill_text += ` ${event.target.value}`;
    this.setState({
      quill_text: quill_text
    });
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
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
            <Form.Group>
              <Form.Label>Add Boilerplate to text field below</Form.Label>
              <Form.Control
                as="select" 
                name="currentBoilerplate"
                value={this.state.currentBoilerplate}
                onChange={this.handleSelect}
              >
                <option value="" disabled>Select Boilerplate</option>
                {this.state.boilerplates.map(boilerplate => {
                  return(
                    <option 
                      key={boilerplate.id} 
                      value={boilerplate.text} 
                      onChange={this.handleChange}
                    >
                      {boilerplate.title}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Label>Grant Section Text</Form.Label>
            <ReactQuill 
              // name="quill_text"
              value={this.state.quill_text}
              onChange={this.quillChange}  
            />
            {/* <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
                rows="4"
                cols="50"
                required
              ></Form.Control>
            </Form.Group> */}
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{this.countWords(this.state.quill_text)}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sort Order</Form.Label>
              <Form.Control
                type="text"
                name="sort_order"
                value={this.state.sort_order}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button type="submit">
                Add New Section
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default SectionsNew;
