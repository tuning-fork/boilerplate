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
      id: "",
      quill_text: "",
      report_id: "",
      title: "",
      // text: "",
      sort_order: "",
      wordcount: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleReportSectionDelete = this.handleReportSectionDelete.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  componentDidMount() {  
    axios
      .get(`/api/report_sections/${this.props.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          report_id: response.data.report_id,
          title: response.data.title,
          quill_text: response.data.text,
          sort_order: response.data.sort_order,
          wordcount: response.data.wordcount,
          loading: false,
        });
      })
      .then((response) => {
        this.toggleHidden();
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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  handleSubmit(event) {
    const { title, quill_text, sort_order } = this.state;
    axios
      .patch(
        '/api/report_sections/' + this.state.id, 
        {
          report_id: this.state.report_id,
          title: title,
          text: quill_text,
          sort_order: sort_order, 
          wordcount: this.countWords(this.state.quill_text),
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('section update error', error);
      });
    event.preventDefault();
  }

  handleReportSectionDelete() {
    axios
      .delete('/api/report_sections/' + this.state.id,
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
          <Card.Header>
            <h1>Report Section Show</h1>
          </Card.Header>
          <Card.Body>
            <h3>title: {this.state.title}</h3>
            <h3>text: {this.state.quill_text}</h3>
            <h3>sort_order: {this.state.sort_order}</h3>
            <h3>wordcount: {this.countWords(this.state.quill_text)}</h3>
            <h3>report_id: {this.state.report_id}</h3>
          </Card.Body>
        </Card>
        <br />

        <div>
          <div className="container">
            <Button onClick={this.toggleHidden.bind(this)}>
              Update Report Section
            </Button>
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
                        // placeholder={this.state.title}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    {/* <Form.Group>
                      <Form.Label>Text</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.text}
                        name="text"
                        // placeholder={this.state.text}
                        onChange={this.handleChange}
                        required
                      />
                    </div> */}
                    <ReactQuill 
                      // name="quill_text"
                      value={this.state.quill_text}
                      onChange={this.quillChange}  
                    />
                    <Form.Group>
                      <Form.Label>Word Count</Form.Label>
                      <p>{this.countWords(this.state.quill_text)}</p>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Sort Order</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.sort_order}
                        name="sort_order"
                        // placeholder={this.state.sort_order}
                        onChange={this.handleChange}
                        required
                      />
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
