import React, { Component } from 'react';
import axios from 'axios';

class SectionsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      text: "",
      sort_order: "",
      wordcount: "",
      grant_id: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSectionDelete = this.handleSectionDelete.bind(this);
  }

  componentDidMount() {
    
    // axios
    //   .get(`/api/section/${this.props.match.params.id}`)
    //   .then((response) => {
    //     this.setState({
    //       id: response.data.id,
    //       title: response.data.title,
    //       text: response.data.text,
    //       sort_order: response.data.sort_order,
    //       wordcount: response.data.word_count,
    //       grant_id: response.data.grant_id,
    //       errors: [],
    //       loading: false,
    //     });
    //   })
    //   // .then((response) => {
    //   //   this.showEditAbility();
    //   // })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
    const { title, text, sort_order, wordcount, grant_id } = this.state;
    axios
      .patch(
        '/api/sections/' + this.state.id,
        {
          title: title,
          text: text,
          sort_order: sort_order,
          wordcount: wordcount,
          grant_id: grant_id
        }
      )
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('section update error', error);
      });
    event.preventDefault();
  }

  handleSectionDelete() {
    axios
      .delete('/api/sections/' + this.state.id)
      .then((response) => {
        if (response.data.message) {
          this.props.history.push('/sections');
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
        <h3>title: {this.state.title}</h3>
        <h3>text: {this.state.text}</h3>
        <h3>sort_order: {this.state.sort_order}</h3>
        <h3>wordcount: {this.state.wordcount}</h3>
        <h3>grant_id: {this.state.grant_id}</h3>
        <br />

        <div>
            <div className="container">
              <button onClick={this.toggleHidden.bind(this)}>
                Update Section
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
                      <div className="form-group">
                        <label>Sort Order</label>
                        <input
                          type="text"
                          value={this.state.sort_order}
                          name="sort_order"
                          placeholder={this.state.sort_order}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Grant ID</label>
                        <input
                          type="text"
                          value={this.state.grant_id}
                          name="grant_id"
                          placeholder={this.state.grant_id}
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
        <button onClick={this.handleSectionDelete}>Delete</button>
      </div>
    );
  }
}

export default SectionsShow;
