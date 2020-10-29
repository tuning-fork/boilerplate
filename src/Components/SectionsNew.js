import React, { Component } from 'react';
import axios from 'axios';

class SectionsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      boilerplates: [],
      currentBoilerplate: '',
      addText: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
  }

  clearForm = () => {
    this.setState({
      title: '',
      text: '',
      sort_order: '',
      wordcount: '',
      currentBoilerplate: '',
      addText: ''
    });
  };

  componentDidMount() {
    axios
      .get('/api/boilerplates') 
      .then((response) => {
        this.setState({
          boilerplates: response.data
        }); 
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      title, text, sort_order
    } = this.state;
    axios
      .post('/api/sections', {
        grant_id: this.props.grant_id,
        title: title,
        text: text,
        sort_order: sort_order,
        wordcount: this.countWords(this.state.text)
      })
      .then((response) => {
        if (response.data) {
          this.props.updateSections(response.data);
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

  handleSelect = (event) => {
    let text = this.state.text;
    text += ` ${event.target.value}`;
    this.setState({
      text: text
    });
  };

  render() {
    return (
      <div className="card">
        <h3>New Section:</h3>
        <h4>{this.state.grant_id}</h4>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Text</label>
              <textarea
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
                rows="4"
                cols="50"
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Word Count</label>
              <p>{this.countWords(this.state.text)}</p>
            </div>
            <div className="form-group">
              <label>Sort Order</label>
              <input
                type="text"
                name="sort_order"
                value={this.state.sort_order}
                onChange={this.handleChange}
                required
              />
            </div>

            <div>
            <label>Add Boilerplate</label>

            <select name="currentBoilerplate"
            value={this.state.currentBoilerplate}
            onChange={this.handleSelect}
            >
            <option value="" disabled>Select Boilerplate</option>
            {this.state.boilerplates.map(boilerplate => {
              return(
                <option key={boilerplate.id} value={boilerplate.text} onChange={this.handleChange}>{boilerplate.title}</option>
                );
            })}
            </select>
            </div>
            <h2>
            {this.state.text}
            </h2>

            <div className="text-center">
              <button type="submit" className="btn-md">
                Add New Section
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SectionsNew;
