import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class ReportSectionsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quill_text: this.props.report_section_text,
      title: this.props.report_section_title,
      isHidden: true,
      sort_order: "",
      wordcount: "",
      report_id: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleReportSectionDelete = this.handleReportSectionDelete.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  // componentDidMount() {  
  //   axios
  //     .get(`/api/report_sections/${this.props.id}`,
  //       {headers: { Authorization: `Bearer ${localStorage.token}` }})
  //     .then((response) => {
  //       this.setState({
  //         id: response.data.id,
  //         report_id: response.data.report_id,
  //         title: response.data.title,
  //         quill_text: response.data.text,
  //         sort_order: response.data.sort_order,
  //         wordcount: response.data.wordcount,
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
    const { title, quill_text} = this.state;
    axios
      .patch(
        '/api/report_sections/' + this.props.report_section_id, 
        {
          title: title,
          text: quill_text,
          sort_order: this.props.report_section_sort_order, 
          wordcount: this.countWords(this.state.quill_text),
          report_id: this.props.section_report_id
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.toggleHidden();
        this.props.updateReportSections(response.data);
      })
      .catch((error) => {
        console.log('report section update error', error);
      });
    event.preventDefault();
  }

  handleReportSectionDelete() {
    axios
      .delete('/api/report_sections/' + this.props.report_section.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        // if (response.data.message) {
        //   this.props.history.push('/sections');
        // }
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
        <Card>
          <Card.Body>
            <h5>title: {this.props.report_section_title}</h5>
            <h5>text: {this.props.report_section_text}</h5>
            <h5>wordcount: {this.countWords(this.state.quill_text)}</h5>
          </Card.Body>
        </Card>
        <br />
        <div>
          <div className="container">
            {this.state.isHidden ? 
            <Button onClick={this.toggleHidden.bind(this)}>
              Update Report Section
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
                      <Button onClick={this.handleReportSectionDelete}>Delete</Button>
                      <Button
                        onClick={this.toggleHidden.bind(this)}
                        className="btn-lg"
                      >
                        Close
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ReportSectionsShow;
