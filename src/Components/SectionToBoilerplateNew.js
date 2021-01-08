import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'react-quill/dist/quill.snow.css';

class SectionToBoilerplateNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quill_text: "",
      title: "",
      text: "",
      organization_id: "",
      category_id: "",
      wordcount: "",
      categories: [],
      isHiddenCategoriesOrganizationsNew: true,
      errors: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/categories',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          categories: response.data,
          loading: false,
        });
      // console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  updateCategories = (newCategories) => {
    const categories = this.state.categories;
    categories.push(newCategories);
    this.setState({
      categories: categories,
    });
    // console.log("updated categories");
  };

  clearForm = () => {
    this.setState({
      quill_text: "",
      title: "",
      text: "",
      organization_id: "",
      category_id: "",
      wordcount: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  quillChange = (value) => {
    this.setState({ quill_text: value})
  }

  toggleHiddenCategoriesOrganizationsNew = () => {
    this.setState({
      isHiddenCategoriesOrganizationsNew: !this.state.isHiddenCategoriesOrganizationsNew,
    });
  }

  handleSubmit = (event) => {
    axios
      .post('/api/boilerplates', {
        title: this.props.title,
        text: this.props.text,
        organization_id: this.props.organization_id,
        category_id: this.state.category_id,
        wordcount: this.countWords(this.props.text)
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.toggleBoilerplateHidden();
        };
      })
      .catch((error) => {
        console.log('boilerplate creation error', error);
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
    return (
      <div>
      <Card>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
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
                    <option 
                      key={category.id} 
                      value={category.id} 
                      onChange={this.handleChange}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </Form.Control>
              
            </Form.Group>
            <p>{this.props.title}</p>
            <p dangerouslySetInnerHTML={{__html: this.props.text}}></p>
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{this.countWords(this.props.text)}</p>
            </Form.Group>
            
            <div className="text-center">
              <Button type="submit">
                Add New Boilerplate
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default SectionToBoilerplateNew;