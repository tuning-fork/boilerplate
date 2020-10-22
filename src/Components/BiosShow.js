import React, { Component } from 'react';
import axios from 'axios';

class BiosShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      title: "",
      text: "",
      organization_id: "",
      organization: "",
      wordcount: "",
      organizations: [],
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBioDelete = this.handleBioDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/bios/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          title: response.data.title,
          text: response.data.text,
          organization_id: response.data.organization_id,
          organization: response.data.organization,
          wordcount: response.data.wordcount,
          loading: false,
        });
      })
      // .then((response) => {
      //   this.showEditAbility();
      // })
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
    const { first_name, last_name, title, text, organization_id, wordcount } = this.state;
    axios
      .patch(
        '/api/bios/' + this.state.id,
        {
          first_name: first_name,
          last_name: last_name,
          title: title,
          text: text,
          organization_id: organization_id,
          wordcount: wordcount
        }
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('bio update error', error);
      });
    event.preventDefault();
  }

  handleBioDelete() {
    axios
      .delete('/api/bios/' + this.state.id)
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/bios');
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="container">
        <h3>First Name: {this.state.first_name}</h3>
        <h3>Last Name: {this.state.last_name}</h3>
        <h3>title: {this.state.title}</h3>
        <h3>text: {this.state.text}</h3>
        <h3>organization: {this.state.organization.name}</h3>
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
                        <label>First Name</label>
                        <input
                          type="text"
                          value={this.state.first_name}
                          name="first_name"
                          placeholder={this.state.first_name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={this.state.last_name}
                          name="last_name"
                          placeholder={this.state.last_name}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
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
        <button onClick={this.handleBioDelete}>Delete</button>
      </div>
    );
  }
}

export default BiosShow;
