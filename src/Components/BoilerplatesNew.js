import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import CategoriesOrganizationsNew from './CategoriesOrganizationsNew';
import 'react-quill/dist/quill.snow.css';

class BoilerplatesNew extends Component {
  constructor() {
    super();

    this.state = {
      quill_text: "",
      title: "",
      text: "",
      organization_id: "",
      category_id: "",
      wordcount: "",
      categories: [],
      organizations: [],
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
      console.log(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        this.setState({
          organizations: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  updateCategories = (newCategories) => {
    const categories = this.state.categories;
    categories.push(newCategories);
    this.setState({
      categories: categories,
    });
    console.log("updated categories")
  };

  updateOrganizations = (newOrganization) => {
		const organizations = this.state.organizations;
		organizations.push(newOrganization);
		this.setState({
			organizations: organizations,
    });
    console.log("updated organizations");
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
    const {
      title, quill_text, organization_id, category_id
    } = this.state;
    axios
      .post('/api/boilerplates', {
        title: title,
        text: quill_text,
        organization_id: organization_id,
        category_id: category_id,
        wordcount: this.countWords(this.state.quill_text)
      },
      {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          this.props.updateBoilerplates(response.data);
          this.clearForm();
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
        {!this.state.isHiddenCategoriesOrganizationsNew ?
          <CategoriesOrganizationsNew 
          categories={this.state.categories}
          organizations={this.state.organizations}
          updateCategories={this.updateCategories}
          updateOrganizations={this.updateOrganizations}
          toggleHiddenCategoriesOrganizationsNew={this.toggleHiddenCategoriesOrganizationsNew}
          /> : null
        }
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
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
                    <option 
                      key={organization.id} 
                      value={organization.id} 
                      onChange={this.handleChange}
                    >
                      {organization.name}
                    </option>
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

              <Button variant="secondary" size="sm" onClick={this.toggleHiddenCategoriesOrganizationsNew}>Add New Category and/or Organization</Button>
              
            </Form.Group>
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
            <Form.Label>Boilerplate Text</Form.Label>
            <ReactQuill 
              // name="quill_text"
              modules={this.modules}
              format={this.formats}
              value={this.state.quill_text}
              onChange={this.quillChange}  
            />
            <Form.Group>
              <Form.Label>Word Count</Form.Label>
              <p>{this.countWords(this.state.quill_text)}</p>
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

export default BoilerplatesNew;