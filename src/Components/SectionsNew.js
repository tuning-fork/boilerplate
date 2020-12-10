import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class SectionsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quill_text: '',
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      boilerplates: [],
      items: ['boilerplate', 'text', 'things', 'stuff', 'staple'],
      currentBoilerplate: '',
      isHidden: true,
      bios: [],
      title_array: [],
      loading: true,
      suggestions: [],
      searchText: '',
      // addText: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
    this.quillChange = this.quillChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      quill_text: "",
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      currentBoilerplate: '',
      // addText: ''
    });
  };

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  componentDidMount() {
    axios
      .get('/api/boilerplates',
        { headers: { Authorization: `Bearer ${localStorage.token}` } })
      .then((response) => {
        this.setState({
          boilerplates: response.data
        });
      })
    axios
      .get('/api/bios',
        { headers: { Authorization: `Bearer ${localStorage.token}` } })
      .then((response) => {
        this.setState({
          bios: response.data,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  }

  handleSubmit(event) {
    const {
      title, quill_text
    } = this.state;
    axios
      .post('/api/sections', {
        grant_id: this.props.grant_id,
        title: title,
        text: quill_text,
        sort_order: this.props.sort_number + 1,
        wordcount: this.countWords(this.state.quill_text)
      },
        { headers: { Authorization: `Bearer ${localStorage.token}` } })
      .then((response) => {
        if (response.data) {
          this.props.updateNewSections(response.data);
          this.toggleHidden();
          this.clearForm();
        }
      })
      .catch((error) => {
        console.log('section creation error', error);
      });
    event.preventDefault();
  }

  countWords(string) {
    if (string) {
      return (string.split(" ").length);
    } else {
      return 0;
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // users = users.filter(function(user) {
  //   return user.name.toLowerCase().indexOf(q) != -1; // returns true or false
  // });

  // const result = words.filter(word => word.length > 6);

  // const devReact = devs.filter(obj => obj.tech.includes("React")).map(obj => ({"name":obj.name, "tech":obj.tech}));
  // console.log(devReact);

  onTextChanged = (event) => {
    const value = event.target.value.toLowerCase();
    // console.log(value);
    let suggestions = [];
    if (value.length > 0) {
      // const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.state.boilerplates.filter((boilerplate) => {
        return boilerplate.title.toLowerCase().indexOf(value) !== -1;
      })
    }
    this.setState(() => ({ suggestions, searchText: value }));
  }

  suggestionSelected(value) {
    let quill_text = this.state.quill_text;
    quill_text += value.text;
    this.setState(() => ({
      searchText: '',
      suggestions: [],
      quill_text: quill_text
    }));
  }

  renderSuggestions() {
    // console.log(this.state.suggestions);
    if (this.state.suggestions.length === 0) {
      return null;
    }
    return (
      <div>
        {this.state.suggestions.map((boilerplate) => (
          <li
            key={boilerplate.id}
            onClick={() => this.suggestionSelected(boilerplate)}
          >
            {boilerplate.title}
          </li>
        ))}
      </div>
    );
  }

  quillChange(value) {
    this.setState({ quill_text: value })
  }

  handleSelect = (event) => {
    let quill_text = this.state.quill_text;
    quill_text += ` ${event.target.value}`;
    this.setState({
      quill_text: quill_text
    });
  };

  render() {
    // console.log(this.props.sort_number);
    // console.log(this.state.searchText);
    // console.log(this.state.boilerplates);
    return (
      <div>
        {this.state.isHidden ?
          <Button onClick={this.toggleHidden.bind(this)}>
            Add Section
        </Button> :
          <Button onClick={this.toggleHidden.bind(this)}>
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
                    name="title"
                    value={this.state.title}
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
                    {this.state.boilerplates.map(boilerplate => {
                      return (
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
                {/* <Form.Group> */}
                <div>
                  <label>Search Boilerplate by title</label>
                  <input
                    type="text"
                    value={this.state.searchText}
                    onChange={this.onTextChanged}
                  />
                  {this.renderSuggestions()}
                </div>
                {/* </Form.Group> */}
                <Form.Group>
                  <Form.Label>Add Bio Text to text field below</Form.Label>
                  <Form.Control
                    as="select"
                    name="currentBoilerplate"
                    value={this.state.currentBoilerplate}
                    onChange={this.handleSelect}
                  >
                    <option value="" disabled>Select Bio</option>
                    {this.state.bios.map(bio => {
                      return (
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
                <Form.Label>Grant Section Text</Form.Label>
                <ReactQuill
                  // name="quill_text"
                  value={this.state.quill_text}
                  onChange={this.quillChange}
                />
                {/* <Form.Group>
                  <Form.Label>Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                    rows="4"
                    cols="50"
                    required
                  ></Form.Control>
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>Word Count</Form.Label>
                  <p>{this.countWords(this.state.quill_text)}</p>
                </Form.Group>
                <div className="text-center">
                  <Button type="submit">
                    Submit New Section
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default SectionsNew;
