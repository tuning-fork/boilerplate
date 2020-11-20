import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class SectionsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quill_text: this.props.section_text,
      title: this.props.section_title,
      isHidden: true,
      wordcount: "",
      grant_id: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleSectionDelete = this.handleSectionDelete.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  // componentDidMount() {  
  //   axios
  //     .get(`/api/sections/${this.props.id}`,
  //       {headers: { Authorization: `Bearer ${localStorage.token}` }})
  //     .then((response) => {
  //       this.setState({
  //         id: response.data.id,
  //         title: response.data.title,
  //         quill_text: response.data.text,
  //         sort_order: response.data.sort_order,
  //         wordcount: response.data.wordcount,
  //         grant_id: response.data.grant_id,
  //         errors: [],
  //         loading: false,
  //       });
  //     })
  //     .then((response) => {
  //       this.toggleHidden();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  handleSubmit(event) {
    const { title, quill_text } = this.state;
    axios
      .patch(
        '/api/sections/' + this.props.section_id, 
        {
          title: title,
          text: quill_text,
          sort_order: this.props.section_sort_order, 
          wordcount: this.countWords(this.state.quill_text),
          grant_id: this.props.section_grant_id
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
        console.log('grant section update error', error);
      });
    event.preventDefault();
  }

  handleSectionDelete() {
    axios
      .delete('/api/sections/' + this.props.section.id,
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
        <Card>
          <Card.Body>
            <h5>{this.props.section_title}</h5>
            <h5>{this.props.section_text}</h5>
            <h5>wordcount: {this.countWords(this.state.quill_text)}</h5>
          </Card.Body>
          <div className="container">
            {this.state.isHidden ? 
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Section
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
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.title}
                        name="title"
                        // placeholder={this.props.section_title}
                        onChange={this.handleChange}
                        required
                      />
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
            ) : null}
          </div>
        </Card>
        <br />
      </div>
    );
  }
}

export default SectionsShow;
