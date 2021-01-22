import React, { Component } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class BoilerplatesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      quill_text: "",
      title: "",
      // text: "",
      wordcount: "",
      organization_id: "",
      organization_name: "",
      category_id: "",
      category_name: "",
      organizations: [],
      categories: [],
      isHidden: true,
      errors: [],
    };
  }

  componentDidMount() {
    axios
      .get(`/api/boilerplates/${this.props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          quill_text: response.data.text,
          wordcount: response.data.wordcount,
          organization_id: response.data.organization_id,
          organization_name: response.data.organization.name,
          category_id: response.data.category_id,
          category_name: response.data.category.name,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/categories',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          categories: response.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  quillChange = (value) => {
    this.setState({ quill_text: value})
  }

  handleSubmit = (event) => {
    const { title, quill_text, organization_id, category_id } = this.state;
    axios
      .patch(
        '/api/boilerplates/' + this.state.id,
        {
          title: title,
          text: quill_text,
          wordcount: this.countWords(this.state.quill_text),
          organization_id: organization_id,
          category_id: category_id
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('boilerplate update error', error);
      });
    event.preventDefault();
  }

  countWords = (string) => { 
    if (string) {
      return (string.split(" ").length);
      } else {
        return 0; 
      }
  }

  handleBoilerplateDelete = () => {
    axios
      .delete('/api/boilerplates/' + this.state.id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/boilerplates');
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['clean'],
      [{'color': []}]
    ],
  }
 
  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'color'
  ]

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    };

    return (
      <div className="container">
        <Card>
          <Card.Header>
            <h3>{this.state.title}</h3>
          </Card.Header>
          <Card.Body>
            <p dangerouslySetInnerHTML={{__html: this.state.quill_text}}></p>
            <h5>Organization {this.state.organization_name}</h5>
            <h5>Category: {this.state.category_name}</h5>
            <h5>Word Count: {this.countWords(this.state.quill_text)}</h5>
          </Card.Body>
        </Card>
        <br />

        <div>
          <div className="container">
            <Button onClick={this.toggleHidden.bind(this)}>
              Update Boilerplate
            </Button>
            <Button variant="danger" onClick={this.handleBoilerplateDelete}>
              Delete Boilerplate
            </Button>
            <br />
            <br />
            {!this.state.isHidden ? (
              <div>
                <div>
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
                      modules={this.modules}
                      format={this.formats}
                      defaultValue={this.state.quill_text}
                      onChange={this.quillChange}  
                    />
                    {/* <Form.Group>
                      <Form.Label>Text</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.text}
                        name="text"
                        placeholder={this.state.text}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group> */}
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
                    {this.state.organizations.map(organization => {
                      return(
                        <option key={organization.id} value={organization.id} onChange={this.handleChange}>{organization.name}</option>
                        );
                    })}
                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Category</Form.Label>

                    <Form.Control 
                      as="select"
                      name="category_id"
                      value={this.state.category_id}
                      onChange={this.handleChange}
                      required
                    >
                    <option value="" disabled>Select Category</option>
                    {this.state.categories.map(category => {
                      return(
                        <option key={category.id} value={category.id} onChange={this.handleChange}>{category.name}</option>
                        );
                    })}
                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Word Count</Form.Label>
                      <p>{this.countWords(this.state.quill_text)}</p>
                    </Form.Group>
                    <div className="text-center">
                      <Button type="submit" className="btn-lg">
                        Submit
                      </Button>
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

export default BoilerplatesShow;
