import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class ReportSectionsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill_text: '',
      report_id: '',
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
    this.quillChange = this.quillChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      quill_text: '',
      title: '',
      text: '',
      sort_order: '',
      wordcount: 0,
      currentBoilerplate: ''
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
      title, quill_text
    } = this.state;
    axios
      .post('/api/report_sections', {
        report_id: this.props.report_id,
        title: title,
        text: quill_text,
        sort_order: this.props.sort_number + 1,
        wordcount: this.countWords(this.state.quill_text)
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateReportSections(response.data);
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
        <h3>New Report Section:</h3>
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
              <Form.Label>Add Boilerplate to Text Area</Form.Label>
              <Form.Control 
                as="select"
                name="currentBoilerplate"
                value={this.state.currentBoilerplate}
                onChange={this.handleSelect}
              >
                <option value="" disabled>Select Boilerplate</option>
                {this.state.boilerplates.map(boilerplate => {
                  return(
                    <option key={boilerplate.id} value={boilerplate.text} onChange={this.handleChange}>{boilerplate.title}</option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Label>Report Section Text</Form.Label>
            <ReactQuill 
              // name="quill_text"
              value={this.state.quill_text}
              onChange={this.quillChange}  
            />
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{this.countWords(this.state.quill_text)}</p>
            </Form.Group>
            {/* <p>Sort Order: {this.props.grant_section_number}</p> */}
            <div className="text-center">
              <Button type="submit">
                Add New Report Section
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default ReportSectionsNew;
