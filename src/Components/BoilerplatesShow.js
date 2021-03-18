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
      isUnzipped: false,
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

  toggleUnzipped = () => {
    this.setState({
      isUnzipped: !this.state.isUnzipped
    });
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
      <div className="flex-container">
      {/* {(this.state.isUnzipped === false) ? ( */}
        {/* <Card>
          <Card.Header style={{color: "black"}}>
            <h3>{this.state.title}</h3>
            <h1 onClick={this.toggleUnzipped}>+</h1>
          </Card.Header>
        </Card> */}
      {/* ) : ( */}
        <Card>
          <Card.Header style={{backgroundColor: "#09191b"}}>
            <h3 style={{color: "#23cb87", fontWeight: "bolder", display: "inline"}}>{this.state.title}</h3>
            {/* <h1 onClick={this.toggleUnzipped}>-</h1> */}
          </Card.Header>
          <Card.Body>
            <p dangerouslySetInnerHTML={{__html: this.state.quill_text}}></p>
            <h4>Organization {this.state.organization_name}</h4>
            <h4>Category: {this.state.category_name}</h4>
            <h4>Word Count: {this.countWords(this.state.quill_text)}</h4>
          </Card.Body>
          <div style={{flex: "auto"}}>
          <Button onClick={this.toggleHidden.bind(this)} style={{flex: "col", maxWidth: "25%", align: "right", backgroundColor: "#23cb87", borderColor: "#fefefe", color: "#09191b", fontWeight: "bolder"}}>
              Update Content
            </Button>
            <Button variant="danger" onClick={this.handleBoilerplateDelete} style={{flex: "col", maxWidth: "25%", align: "right", fontWeight: "bolder"}}>
              Delete Content
            </Button>
          </div>
        </Card>
        {/* )} */}
        <br />

        <div>
            {!this.state.isHidden ? (
              <Card style={{backgroundColor: "#09191b", color: "#fefefe"}}>
                <Card.Body>
                <Button
                        onClick={this.toggleHidden.bind(this)}
                        variant="outline-success" type="submit" style={{maxWidth: "20%", align: "center", backgroundColor: "#23cb87", color: "#09191b", fontWeight: "bolder", textAlign: "right"}}
                      >
                        Close
                      </Button>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group style={{display: "l"}}>
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
                      style={{backgroundColor: "#fefefe"}}
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
                      <p style={{color: "#fefefe"}}>{this.countWords(this.state.quill_text)}</p>
                    </Form.Group>
                    <div className="text-center">
                    <Button variant="outline-success" type="submit" style={{maxWidth: "20%", align: "center", backgroundColor: "#23cb87", color: "#09191b", fontWeight: "bolder"}}>
                  Save Changes
                </Button>
                <Button variant="outline-danger" style={{maxWidth: "20%", align: "center", backgroundColor: "red", color: "#09191b", fontWeight: "bolder"}} onClick={this.handleBioDelete}>Delete Content</Button>
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

export default BoilerplatesShow;
