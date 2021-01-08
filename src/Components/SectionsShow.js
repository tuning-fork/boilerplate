import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SectionToBoilerplateNew from './SectionToBoilerplateNew';

class SectionsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quill_text: "",
      title: "",
      sort_order: "",
      isHidden: true,
      isBoilerplateHidden: true,
      wordcount: "",
      grant_id: "",
      errors: [],
      currentBoilerplate: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleSectionDelete = this.handleSectionDelete.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/sections/' + this.props.section_id,
        {headers: { Authorization: `Bearer ${localStorage.token}` }}) 
      .then((response) => {
        this.setState({
          title: response.data.title,
          quill_text: response.data.text,
          wordcount: response.data.wordcount,
          sort_order: response.data.sort_order,
          grant_id: response.data.grant_id
        }); 
      })
      .catch((error) => console.log(error));
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  toggleBoilerplateHidden = () => {
    this.setState({
      isBoilerplateHidden: !this.state.isBoilerplateHidden
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSelect = (event) => {
    let quill_text = this.state.quill_text;
    quill_text += ` ${event.target.value}`;
    this.setState({
      quill_text: quill_text
    });
  };

  quillChange(value) {
    this.setState({ quill_text: value})
  }

  handleSubmit(event) {
    const { title, quill_text, sort_order, grant_id } = this.state;
    axios
      .patch(
        '/api/sections/' + this.props.section_id, 
        {
          title: title,
          text: quill_text,
          sort_order: sort_order, 
          wordcount: this.countWords(this.state.quill_text),
          grant_id: grant_id
        },
        {headers: { Authorization: `Bearer ${localStorage.token}` }})
      .then((response) => {
        if (response.data) {
          // console.log(response.data);
          this.props.updateSections(response.data);
          this.toggleHidden();
        }
      })
      .catch((error) => {
        console.log('grant section update error', error);
      });
    event.preventDefault();
  }

  handleSectionDelete() {
    axios
      .delete('/api/sections/' + this.props.section_id,
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
    return (
      <div className="container">
        <Card>
          <Card.Body>
            <h5>{this.state.title}</h5>
            <h5 dangerouslySetInnerHTML={{__html: this.state.quill_text}}></h5>
            <h5>wordcount: {this.countWords(this.state.quill_text)}</h5>
          </Card.Body>
          <div className="container">
            {this.state.isHidden ? 
              <Button onClick={this.toggleHidden.bind(this)}>
                Update Section
              </Button> :
              <Button
                onClick={this.toggleHidden.bind(this)}
              >
                Close
              </Button>
            }
            {this.state.isBoilerplateHidden ? 
              <Button onClick={this.toggleBoilerplateHidden}>
                Save Section as Boilerplate
              </Button> :
              <Button
                onClick={this.toggleBoilerplateHidden}
              >
                Close
              </Button>
            }
            {!this.state.isBoilerplateHidden ? 
                <SectionToBoilerplateNew 
                  toggleBoilerplateHidden={this.toggleBoilerplateHidden} 
                  organization_id={this.props.organization_id} 
                  title={this.state.title} 
                  text={this.state.quill_text}
                /> : null
              }
            {/* <Link 
              to={'/boilerplates'}
            >
              Add To Boilerplates
            </Link>
            <Link to={{
              pathname: '/boilerplates',
              state: {
                text: this.state.quilltext
              }
            }}>Add To Boilerplates</Link>
            <br />
            <br /> */}

            {/* Beginning of section update form */}

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
                        // placeholder={this.props.section_title}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Add Boilerplate to text field below</Form.Label>
                      <Form.Control
                        as="select" 
                        name="currentBoilerplate"
                        value={this.state.currentBoilerplate}
                        onChange={this.handleSelect}
                      >
                        <option value="" disabled>Select Boilerplate</option>
                        {this.props.boilerplates.map(boilerplate => {
                          return(
                            <option 
                              key={boilerplate.id} 
                              value={boilerplate.text} 
                              onChange={this.handleChange}
                            >
                              {boilerplate.title}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Add Bio Text to text field below</Form.Label>
                      <Form.Control
                        as="select" 
                        name="currentBoilerplate"
                        value={this.state.currentBoilerplate}
                        onChange={this.handleSelect}
                      >
                        <option value="" disabled>Select Bio</option>
                        {this.props.bios.map(bio => {
                          return(
                            <option 
                              key={bio.id} 
                              value={`${bio.first_name} ${bio.last_name}: ${bio.text}`} 
                              onChange={this.handleChange}
                            >
                              {`${bio.first_name} ${bio.last_name}`}
                            </option>
                          );
                        })}
                      </Form.Control>
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
                      <Button variant="danger" onClick={this.handleSectionDelete}>Delete</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            ) : null}
          </div>
          {/* {!this.state.isBoilerplateHidden ? 
              <BoilerplatesNew />
              : null
            } */}
        </Card>
        <br />
      </div>
    );
  }
}

export default SectionsShow;
