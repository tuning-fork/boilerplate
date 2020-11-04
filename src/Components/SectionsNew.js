import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class SectionsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      boilerplates: [],
      currentBoilerplate: '',
      addText: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
  }

  clearForm = () => {
    this.setState({
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      currentBoilerplate: '',
      addText: ''
    });
  };

  componentDidMount() {
    axios
      .get('/api/boilerplates') 
      .then((response) => {
        this.setState({
          boilerplates: response.data
        }); 
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      title, text, sort_order
    } = this.state;
    axios
      .post('/api/sections', {
        grant_id: this.props.grant_id,
        title: title,
        text: text,
        sort_order: sort_order,
        wordcount: this.countWords(this.state.text)
      })
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

  handleSelect = (event) => {
    let text = this.state.text;
    text += ` ${event.target.value}`;
    this.setState({
      text: text
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
            <Form.Group>
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
            </Form.Group>
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{this.countWords(this.state.text)}</p>
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
