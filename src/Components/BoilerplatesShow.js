import React, { Component } from 'react';
import axios from 'axios';

class BoilerplatesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      text: "",
      wordcount: "",
      organization_id: "",
      category_id: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/boilerplates/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          text: response.data.text,
          wordcount: response.data.wordcount,
          organization_id: response.data.organization_id,
          category_id: response.data.category_id,
          loading: false,
        });
      })
      .then((response) => {
        this.showEditAbility();
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
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const { title, text, organization_id, category_id, wordcount } = this.state;
    axios
      .patch(
        '/api/boilerplates/' + this.state.id,
        {
          title: title,
          text: text,
          wordcount: wordcount,
          organization_id: organization_id,
          category_id: category_id
        }
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('boilerplate update error', error);
      });
    event.preventDefault();
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="container">
        <h3>title: {this.state.title}</h3>
        <h3>text: {this.state.text}</h3>
        <h3>organization_id: {this.state.organization_id}</h3>
        <h3>category_id: {this.state.category_id}</h3>
        <h3>wordcount: {this.state.wordcount}</h3>
        <br />

        <div>
            <div className="container">
              <button onClick={this.toggleHidden.bind(this)}>
                Update Bio
              </button>
              <br />
              <br />
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          value={this.state.title}
                          name="title"
                          placeholder={this.state.title}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Text</label>
                        <input
                          type="text"
                          value={this.state.text}
                          name="text"
                          placeholder={this.state.text}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Organization ID</label>
                        <input
                          type="text"
                          value={this.state.organization_id}
                          name="organization_id"
                          placeholder={this.state.organization_id}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Category ID</label>
                        <input
                          type="text"
                          value={this.state.category_id}
                          name="category_id"
                          placeholder={this.state.category_id}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Wordcount</label>
                        <input
                          type="text"
                          value={this.state.wordcount}
                          name="wordcount"
                          placeholder={this.state.wordcount}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      
                      <div className="text-center">
                        <button type="submit" className="btn-lg">
                          Submit
                        </button>
                        <button
                          onClick={this.toggleHidden.bind(this)}
                          className="btn-lg"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default BoilerplatesShow;
