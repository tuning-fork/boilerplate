import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import Container from 'react-bootstrap/Container';
import 'react-quill/dist/quill.snow.css';

class ReportSectionsUpdateFinal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: "",
      quill_text: this.props.report_section_text,
      title: this.props.report_section_title,
      // text: "",
      // sort_order: "",
      isHidden: true,
      wordcount: "",
      report_id: "",
      grant_id: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleReportSectionDelete = this.handleReportSectionDelete.bind(this);
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

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  handleSubmit(event) {
    const { title, quill_text } = this.state;
    axios
      .patch(
        '/api/report_sections/' + this.props.report_section_id, {
          title: title,
          text: quill_text,
          sort_order: this.props.section_sort_order, 
          wordcount: this.countWords(this.state.quill_text)
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          this.toggleHidden();
          this.props.updateReportSections(response.data);
        }
      })
      .catch((error) => {
        console.log('section update error', error);
      });
    event.preventDefault();
  }

  handleReportSectionDelete() {
    axios
      .delete('/api/report_sections/' + this.props.section.id,
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
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="container">
            <Container className="whatever" onClick={this.toggleHidden.bind(this)}>
              <h5>{this.props.report_section_title}</h5>
              <h5 dangerouslySetInnerHTML={{__html: this.props.report_section_text}}></h5>
            </Container>
            
          <div className="container">
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
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
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
                        Submit
                      </Button>
                      <Button onClick={this.toggleHidden}>
                        Close
                      </Button>
                      <Button onClick={this.handleReportSectionDelete}>Delete</Button>
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

export default ReportSectionsUpdateFinal;
