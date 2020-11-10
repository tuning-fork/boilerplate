import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SectionsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      quill_text: "",
      title: "",
      text: "",
      sort_order: "",
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

  componentDidMount() {  
    axios
      .get(`/api/sections/${this.props.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          text: response.data.text,
          sort_order: response.data.sort_order,
          wordcount: response.data.wordcount,
          grant_id: response.data.grant_id,
          errors: [],
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

  handleSubmit(event) {
    const { title, text, sort_order, grant_id } = this.state;
    axios
      .patch(
        '/api/sections/' + this.state.id, {
          title: title,
          text: quill_text,
          sort_order: sort_order, 
          wordcount: this.countWords(this.state.text),
          grant_id: grant_id
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

  handleSectionDelete() {
    axios
      .delete('/api/sections/' + this.props.section.id,
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
          <h1>Section Show</h1>
          </Card.Header>
          <Card.Body>
          <h3>title: {this.state.title}</h3>
          <h3>text: {this.state.text}</h3>
          <h3>sort_order: {this.state.sort_order}</h3>
          <h3>wordcount: {this.countWords(this.state.text)}</h3>
          <h3>grant_id: {this.state.grant_id}</h3>
          </Card.Body>
        </Card>
        <br />

        <div>
            <div className="container">
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Section
              </Button>
              <br />
              <br />
              {!this.state.isHidden ? (
                <div className="card">
                  <div className="card-body">
                    <Form onSubmit={this.handleSubmit}>
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
                      <ReactQuill 
                        // name="quill_text"
                        defaultValue={this.state.quill_text}
                        onChange={this.quillChange}  
                      />
                      <Form.Group>
                      <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.text}
                          name="text"
                          placeholder={this.state.text}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Word Count</Form.Label>
                        <p>{this.countWords(this.state.text)}</p>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Sort Order</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.sort_order}
                          name="sort_order"
                          placeholder={this.state.sort_order}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group>
                      <Form.Label>Grant ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={this.state.grant_id}
                          name="grant_id"
                          placeholder={this.state.grant_id}
                          onChange={this.handleChange}
                          required
                        />
                      </Form.Group>
                      
                      <div className="text-center">
                        <Button type="submit" className="btn-lg">
                          Submit
                        </Button>
                        <Button onClick={this.handleSectionDelete}>Delete</Button>
                        <Button
                          onClick={this.toggleHidden.bind(this)}
                          className="btn-lg"
                        >
                          Close
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
                ) : null}
            </div>
        </div>
      </div>
    );
  }
}

export default SectionsShow;
