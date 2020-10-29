import React, { Component } from 'react';
import axios from 'axios';

class ReportSectionsShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      report_id: "",
      title: "",
      text: "",
      sort_order: "",
      wordcount: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countWords = this.countWords.bind(this);
    this.handleReportSectionDelete = this.handleReportSectionDelete.bind(this);
  }

  componentDidMount() {  
    axios
      .get(`/api/report_sections/${this.props.id}`)
      .then((response) => {
        this.setState({
          id: response.data.id,
          report_id: response.data.report_id,
          title: response.data.title,
          text: response.data.text,
          sort_order: response.data.sort_order,
          wordcount: response.data.wordcount,
          errors: [],
          loading: false,
        });
      })
      .then((response) => {
        this.toggleHidden();
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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { report_id, title, text, sort_order } = this.state;
    axios
      .patch(
        '/api/report_sections/' + this.state.id, 
        {
          report_id: report_id,
          title: title,
          text: text,
          sort_order: sort_order, 
          wordcount: this.countWords(this.state.text),
        })
      .then((response) => {
        this.toggleHidden();
      })
      .catch((error) => {
        console.log('section update error', error);
      });
    event.preventDefault();
  }

  handleReportSectionDelete() {
    axios
      .delete('/api/report_sections/' + this.props.id)
      .then((response) => {
        // if (response.data.message) {
        //   this.props.history.push('/sections');
        // }
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
    if (this.state.loading) {
      return <h1>Loading....</h1>;
    }
    return (
      <div className="container">
        <h1>Report Section Show</h1>
        <h3>title: {this.state.title}</h3>
        <h3>text: {this.state.text}</h3>
        <h3>sort_order: {this.state.sort_order}</h3>
        <h3>wordcount: {this.countWords(this.state.text)}</h3>
        <h3>report_id: {this.state.report_id}</h3>
        <br />

        <div>
            <div className="container">
              <button onClick={this.toggleHidden.bind(this)}>
                Update Report Section
              </button>
              <br />
              <br />
              {!this.state.isHidden ? (
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
                        <label>Word Count</label>
                        <p>{this.countWords(this.state.text)}</p>
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
                      <div className="text-center">
                        <button type="submit" className="btn-lg">
                          Submit
                        </button>
                        <button onClick={this.handleSectionDelete}>Delete</button>
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
                ) : null}
            </div>
        </div>
      </div>
    );
  }
}

export default ReportSectionsShow;
