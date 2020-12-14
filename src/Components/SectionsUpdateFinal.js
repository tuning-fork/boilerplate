import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import Container from 'react-bootstrap/Container';
import 'react-quill/dist/quill.snow.css';

class SectionsUpdateFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: "",
      quill_text: "",
      title: "",
      sort_order: "", 
      isHidden: true,
      wordcount: "",
      // boilerplates: [],
      currentBoilerplate: '',
      // bios: [],
      grant_id: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleSectionDelete = this.handleSectionDelete.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSelect = (event) => {
    let quill_text = this.state.quill_text;
    quill_text += ` ${event.target.value}`;
    this.setState({
      quill_text: quill_text
    });
  };

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  componentDidMount() {
    axios
      .get('/api/sections/' + this.props.section_id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }}) 
      .then((response) => {
        this.setState({
          title: response.data.title,
          quill_text: response.data.text,
          wordcount: response.data.wordcount,
          sort_order: response.data.sort_order,
          grant_id: response.data.grant_id
        }); 
      })
      .catch((error) => console.log(error));
  }

  handleSubmit(event) {
    const { title, quill_text, sort_order, grant_id } = this.state;
    axios
      .patch(
        '/api/sections/' + this.props.section_id, {
          title: title,
          text: quill_text,
          sort_order: sort_order, 
          wordcount: this.countWords(this.state.quill_text),
          grant_id: grant_id
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.toggleHidden();
          this.props.updateSections(response.data);
        }
      })
      .catch((error) => {
        console.log('section update error', error);
      });
    event.preventDefault();
  }

  handleSectionDelete() {
    axios
      .delete('/api/sections/' + this.props.section_id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="container">
        <Container className="whatever" onClick={this.toggleHidden.bind(this)}>
          <h5>{this.state.title}</h5>
          <h5 dangerouslySetInnerHTML={{__html: this.state.quill_text}}></h5>
        </Container>
        <br />
        {!this.state.isHidden ? (
          <div>
            <Card>
            <Button onClick={this.toggleHidden}>
              Close
            </Button>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.title}
                      name="title"
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
                      {this.props.boilerplates.map(boilerplate => {
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
                    <Form.Label>Add Bio Text to text field below</Form.Label>
                    <Form.Control
                      as="select" 
                      name="currentBoilerplate"
                      value={this.state.currentBoilerplate}
                      onChange={this.handleSelect}
                    >
                      <option value="" disabled>Select Bio</option>
                      {this.props.bios.map(bio => {
                        return(
                          <option 
                            key={bio.id} 
                            value={`${bio.first_name} ${bio.last_name}: ${bio.text}`} 
                            onChange={this.handleChange}
                          >
                            {`${bio.first_name} ${bio.last_name}`}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                  <ReactQuill 
                    value={this.state.quill_text}
                    onChange={this.quillChange}  
                  />
                  <Form.Group>
                    <Form.Label>Word Count</Form.Label>
                    <p>{this.countWords(this.state.quill_text)}</p>
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit">
                      Submit
                    </Button>
                    <Button variant="danger" onClick={this.handleSectionDelete}>Delete</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <br />
          </div>
        ) : null}
      </div>
    );
  }
}

export default SectionsUpdateFinal;
