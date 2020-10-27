import React, { Component } from 'react';
import axios from 'axios';

class ReportsNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grant_id: "",
      title: "",
      deadline: "",
      submitted: "",
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clearForm = () => {
    this.setState({
      title: "",
      deadline: "",
      submitted: ""
    });
  };

  componentDidMount() {
    // axios
    //   .get('/api/organizations')
    //   .then((response) => {
    //     this.setState({
    //       organizations: response.data,
    //       loading: false,
    //     });
    //   // console.log(response.data);
    //   })
    //   .catch((error) => console.log(error));
    // axios
    //   .get('/api/funding_orgs')
    //   .then((response) => {
    //     this.setState({
    //       funding_orgs: response.data,
    //       loading: false,
    //     });
    //   // console.log(response.data);
    //   })
    //   .catch((error) => console.log(error));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      title, deadline, submitted
    } = this.state;
    axios
      .post('/api/reports', {
        grant_id: this.props.grant_id,
        title: title,
        deadline: deadline,
        submitted: submitted
      })
      .then((response) => {
        if (response.data) {
          this.props.updateReports(response.data);
          this.clearForm();
        };
      })
      .catch((error) => {
        console.log('report creation error', error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="card">
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
              <label>Deadline</label>
              <input
                name="deadline"
                value={this.state.deadline}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="form-group">
              <label>Submitted</label>
              <input
                name="submitted"
                value={this.state.submitted}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className="text-center">
              <button type="submit" className="btn-md">
                Submit New Report
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReportsNew;