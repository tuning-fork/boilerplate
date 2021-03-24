import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BoilerplatesShow() {
  // constructor(props) {
  //   super(props);

  const [id, setId] = useState("");
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [wordcount, setWordcount] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isHidden, setIsHidden] = useState(true);
  const [isUnzipped, setIsUnzipped] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/boilerplates/${props.match.params.id}`,
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        setId(response.data.id);
        setTitle(response.data.title);
        setQuillText(response.data.text);
        setWordCount(response.data.wordcount);
        setOrganizationId(response.data.organization_id);
        setOrganizationName(response.data.organization.name);
        setCategoryId(response.data.category_id);
        setCategoryName(response.data.category.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('/api/organizations',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        setOrganizations(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    axios
      .get('/api/categories',
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  })

  const toggleUnzipped = () => {
    setIsUnzipped(!isUnzipped)
  }

  const toggleHidden = () => {
    setIsHidden(!isHidden)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  const quillChange = (value) => {
    setQuillText(value);
  }

  const handleSubmit = (event) => {
    // const { title, quill_text, organization_id, category_id } = this.state;
    axios
      .patch(
        '/api/boilerplates/' + id,
        {
          title: title,
          text: quillText,
          wordcount: countWords(quillText),
          organization_id: organizationId,
          category_id: categoryId
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }}
      )
      .then((response) => {
       toggleHidden();
      })
      .catch((error) => {
        console.log('boilerplate update error', error);
      });
    event.preventDefault();
  }

  const countWords = (string) => { 
    if (string) {
      return (string.split(" ").length);
      } else {
        return 0; 
      }
  }

  const handleBoilerplateDelete = () => {
    axios
      .delete('/api/boilerplates/' + id,
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

    if (loading) {
      return (
        <div className="container">
          <h1>Loading....</h1>
        </div>
      );
    };

    return (
      <div className="flex-container">
        <Card>
          <Card.Header style={{backgroundColor: "#09191b"}}>
            <h3 style={{color: "#23cb87", fontWeight: "bolder", display: "inline"}}>{title}</h3>
          </Card.Header>
          <Card.Body>
            <p dangerouslySetInnerHTML={{__html: quillText}}></p>
            <h4>Organization {organizationName}</h4>
            <h4>Category: {categoryName}</h4>
            <h4>Word Count: {this.countWords(quillText)}</h4>
          </Card.Body>
          <div style={{flex: "auto"}}>
          <Button onClick={toggleHidden} style={{flex: "col", maxWidth: "25%", align: "right", backgroundColor: "#23cb87", borderColor: "#fefefe", color: "#09191b", fontWeight: "bolder"}}>
              Update Content
            </Button>
            <Button variant="danger" onClick={handleBoilerplateDelete} style={{flex: "col", maxWidth: "25%", align: "right", fontWeight: "bolder"}}>
              Delete Content
            </Button>
          </div>
        </Card>
        {/* )} */}
        <br />

        <div>
            {!isHidden ? (
              <Card style={{backgroundColor: "#09191b", color: "#fefefe"}}>
                <Card.Body>
                <Button
                        onClick={toggleHidden}
                        variant="outline-success" type="submit" style={{maxWidth: "20%", align: "center", backgroundColor: "#23cb87", color: "#09191b", fontWeight: "bolder", textAlign: "right"}}
                      >
                        Close
                      </Button>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group style={{display: "l"}}>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        name="title"
                        placeholder={title}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <ReactQuill 
                      // name="quill_text"
                      modules={modules}
                      format={formats}
                      defaultValue={quillText}
                      onChange={quillChange}  
                      style={{backgroundColor: "#fefefe"}}
                    />
                    {/* <Form.Group>
                      <Form.Label>Text</Form.Label>
                      <Form.Control
                        type="text"
                        value={text}
                        name="text"
                        placeholder={text}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group> */}
                    <Form.Group>
                    <Form.Label>Organization</Form.Label>
                    <Form.Control 
                      as="select"
                      name="organizationId"
                      value={organizationId}
                      onChange={handleChange}
                      required
                    >
                    <option value="" disabled>Select Organization</option>
                    {organizations.map(organization => {
                      return(
                        <option key={organization.id} value={organization.id} onChange={handleChange}>{organization.name}</option>
                        );
                    })}
                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Category</Form.Label>

                    <Form.Control 
                      as="select"
                      name="categoryId"
                      value={categoryId}
                      onChange={handleChange}
                      required
                    >
                    <option value="" disabled>Select Category</option>
                    {categories.map(category => {
                      return(
                        <option key={category.id} value={category.id} onChange={handleChange}>{category.name}</option>
                        );
                    })}
                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Word Count</Form.Label>
                      <p style={{color: "#fefefe"}}>{countWords(quillText)}</p>
                    </Form.Group>
                    <div className="text-center">
                    <Button variant="outline-success" type="submit" style={{maxWidth: "20%", align: "center", backgroundColor: "#23cb87", color: "#09191b", fontWeight: "bolder"}}>
                  Save Changes
                </Button>
                <Button variant="outline-danger" style={{maxWidth: "20%", align: "center", backgroundColor: "red", color: "#09191b", fontWeight: "bolder"}} onClick={handleBoilerplateDelete}>Delete Content</Button>
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
